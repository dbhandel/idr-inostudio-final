import pg from 'pg-promise';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
import promisify from 'promisify-node';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { db, conn } from '../db';
import { formHandler } from '../helpers';
import exceptions from '../exceptions';
import config from '../config';
import sql from '../sql';

// Schemas
import userSchema from '../schemas/user';

// Promisified version of bcrypt
const bcryptPromise = promisify(bcrypt);

/**
 * Creates a new user, and sets `user` data (minus password) on ctx.body
 * @param {object} ctx - Koa context object
 */
export async function createUser(ctx) {
  const form = await formHandler(ctx.request.body, userSchema, [
    'email',
    'password',
    'name',
  ]);

  // Check existing users
  const existing = await conn.oneOrNone(
    'SELECT id FROM users WHERE email=$<email> LIMIT 1', {
      email: form.get('email'),
    },
  );

  if (existing) {
    throw new exceptions.BadRequest({
      email: 'Your e-mail is already registered. Please login instead.',
    });
  }

  // Generate the password
  const salt = await bcryptPromise.genSalt(10);

  // Create the insert
  const now = new Date();
  const data = {
    id: uuid.v4(),
    email: form.get('email'),
    password: await bcryptPromise.hash(form.get('password'), salt),
    first_name: form.get('parsedName').firstName,
    last_name: form.get('parsedName').lastName,
    created_at: now,
    updated_at: now,
  };

  // Insert
  await conn.none(db.helpers.insert(data, null, 'users'));
  ctx.body = _.omit(data, 'password');
}

/**
 * Logins in a new user, and responds with {token: jwtToken }
 * @param {object} ctx - Koa context object
 */
export async function login(ctx) {
  const form = await formHandler(ctx.request.body, userSchema, [
    'email',
    'password',
  ]);

  // Get user on e-mail address
  const user = await conn.oneOrNone(
    sql.users.selectByEmail, {
      columns: ['id', 'password'].map(pg.as.name).join(),
      email: form.get('email'),
    },
  );

  if (!user) {
    throw new exceptions.BadRequest({
      email: 'No account found under that e-mail address.',
    });
  }

  // Check password
  if (!await bcryptPromise.compare(form.get('password'), user.password)) {
    throw new exceptions.BadRequest({
      password: 'Please check your password and try again.',
    });
  }

  // Generate a JWT token with the user ID
  ctx.body = {
    token: jwt.sign({ id: user.id }, config.jwt.secret, config.jwt.options),
  };
}

/**
 * Responds with user data set on `ctx.state.user`
 * @param {object} ctx - Koa context object
 */
export async function getUser(ctx) {
  ctx.body = _.omit(ctx.state.user, 'password');
}
