import config from '../src/config';

(async () => {
  config.db.database = 'postgres';
  // eslint-disable-next-line
  const { conn, ping, db } = require('../src/db');
  await ping();

  // create the database if it doesn't exist
  try {
    await conn.query(`CREATE DATABASE ${process.env.DB_NAME}`);
  } catch (e) { /* ignore error */ }
  db.end();
})();
