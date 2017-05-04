import jwt from 'jsonwebtoken';

import config from './config';
import exceptions from './exceptions';
import { conn } from './db';
import sql from './sql';

export async function authenticate(ctx, next) {
  const token = ctx.request.get('Authorization').replace(/^bearer\s/i, '');

  // Verify the JWT token
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (!payload.id) throw new Error('Invalid ID');

    const user = await conn.one(
      sql.users.selectById, {
        columns: '*',
        id: payload.id,
      },
    );

    if (!user) throw new Error('Invalid user');

    // Store the user
    ctx.state.user = user;
  } catch (e) {
    throw new exceptions.NotAuthenticated({
      token: 'Invalid token',
    });
  }
  return next();
}
