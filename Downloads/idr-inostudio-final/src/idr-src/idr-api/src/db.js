import postgres from 'pg-promise';
import delay from 'delay';

import config from './config';

// eslint-disable-next-line global-require
const options = {
  capSQL: true,
};

if (process.env.NODE_ENV !== 'production') {
  // Print the raw query to the console in development
  options.query = function query(ev) {
    // eslint-disable-next-line no-console
    console.log(`SQL: ${ev.query}`);
  };
}

let c = config;

export const db = postgres(options);
export const conn = db(c.db);

export async function ping() {
  for (let i = 1; i <= 60; i++) {
    try {
      await conn.query('SELECT true');
      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`DB connection attempt #${i} failed, retrying...`);
      await delay(1000);
    }
  }

  throw new Error("Couldn't connect to database!");
}
