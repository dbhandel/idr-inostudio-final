// Promisify library, to wrap SendWithUs' callback lib
import promisify from 'promisify-node';

// Load the job queue.  This connects to RabbitMQ via an AMQP client
import { connect as queue } from './queue';

// Load the config.  We'll use it to pull the SendWithUs API keys
// that are specific to our environment
import config from './config';

// Grab the API, using our config API key
const api = require('sendwithus')(config.sendWithUs);

// Promisify the API
const asyncApi = promisify(api);

// Grab the job queue

// Sends e-mail message to our job queue.  We want to avoid sending
// messages in the foreground because that could tie up our user process--
// let's leave that to a dedicated worker
export async function send(msg) {
  const q = await (await queue()).getQueue('email');
  return q.send(msg);
}

// Registers the worker function with the job queue, to perform actual
// e-mail sends
export async function registerWorker() {
  const q = await (await queue()).getQueue('email');
  return q.receive(async emailMessage => (asyncApi.send(emailMessage)));
}
