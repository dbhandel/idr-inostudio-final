import crypto from 'crypto';
import promisify from 'promisify-node';

import exceptions from './exceptions';

const randomNumber = require('random-lib').promise();

// Promisify `crypto.randomBytes`
const randomBytes = promisify(crypto.randomBytes);

// Converts a plain object to a Map
export function objToMap(obj) {
  const m = new Map();
  Object.keys(obj).forEach(key => {
    m.set(key, obj[key]);
  });
  return m;
}

// Generic form handler.  Takes three objects:
//
// 1)  Input data. This is typically sourced from user input on a
// HTML form, but could be any form of generic input.
//
// 2)  Schema object.  These are exported from the relevant '/schemas'
// file and contain a collection of functions that validate input data
// against the respective fields.
//
// 3)  Array of fields.  This tells the schema which fields we care
// about (everything else is ignored).
//
// Throws the error object if a validation error has been encountered,
// or returns a `validated` object containing the valid data if successful
export async function formHandler(input = {}, schema, fields) {
  // Let's create two empty objects -- to store our errors, and any
  // data that successfully validates
  const fieldErrors = {};
  const data = objToMap(input);

  // Loop through all fields in the array -- this is all we care about
  await Promise.all(fields.map(async f => {
    // If there's a corresponding function to be found in the schema
    // file, we'll bind our user input to the schema function (so that
    // it's available via `this`) and await the promise that it returns.
    //
    // Schema functions can be 'async' so we'll prefix all function
    // calls with `await` in case they return promises (in which case,
    // we'll need to be working with resolved data before we can check
    // whether it's valid)
    if (schema[f] && typeof schema[f] === 'function') {
      try {
        // Here, we want to bind ALL the data to the function, and not
        // just this one field. Why? Because sometimes validation depends
        // on secondary fields.  Consider date entry as an example --
        // to validate the number of days in a month, we would also need
        // to know which month was entered.  We can't validate one without
        // the other. So we make the entire user input available via `this`
        // for flexible validation
        await schema[f].bind(data)(fieldErrors);
      } catch (e) {
        // If an error is thrown from our async validation function,
        // simply catch it and add it to the list
        fieldErrors[f] = e.message;
      }
    }
  }));

  // Check if the `ValidationError` is an error (i.e. if it's not empty)
  if (Object.keys(fieldErrors).length) {
    throw new exceptions.BadRequest(fieldErrors);
  }

  // If we got to this point, there's no errors. So let's return the
  // `data` object back, in case the validator has mutated it
  return data;
}

// Generate a random string.  We're going to use the crypto library
// for this, so it's an async function
export async function randomHex(bytes = 32) {
  return (await randomBytes(bytes)).toString('hex');
}

// Generate random integer
export async function randomInt(max, min = 0) {
  return (await randomNumber.randomInts({ min, max, num: 1 }))[0];
}

// General purpose base64 encoding class
export class Base64 {
  // Automatically generates a base64 encoded string on the
  // string passed to the constructor
  constructor(str) {
    this.encoded = new Buffer(str || '').toString('base64');
  }

  // Translates the base64 encoded string back to UTF-8
  decode() {
    return this.encoded.toString('utf8');
  }

  // This function generates 'URL-safe' base64, in accordance
  // with Filestack's policy generator.  We can use this in URLs
  // too, whenever we want to generate something that works with HTML
  // links
  urlEncode() {
    return this.encoded.replace(/\+/g, '-').replace(/\//g, '_');
  }
}

// Normalizes input by turning `null` keys into an empty string
export function normalizeInput(args) {
  for (const key of Object.keys(args)) {
    if ([undefined, null].includes(args[key])) {
      args[key] = '';
    }
  }
  return args;
}
