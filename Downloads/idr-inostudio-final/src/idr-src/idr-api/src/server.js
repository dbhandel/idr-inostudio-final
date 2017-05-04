import Koa from 'koa';
import router from 'koa-router';
import parser from 'koa-body';
import ms from 'microseconds';
import cors from 'koa-cors';
import qs from 'koa-qs';

// DB
import { ping as dbPing } from './db';
import queue from './queue';

// Services
import users from './services/users';
import recalls from './services/recalls';
import tags from './services/tags';
import docs from './services/docs';

const services = [
  users,
  recalls,
  tags,
  docs,
];

export default async function start(port = null) {
  await dbPing();
  /* queue is not complete, just commented */
  //await queue();

  // Start Koa
  const app = (new Koa())
    .use(async(ctx, next) => {
      try {
        await next();
      } catch (e) {
        ctx.body = 'There was an error. Our tech team have been alerted. Please try again later.';
      }
    })
    .use(async(ctx, next) => {
      const startTime = ms.now();
      await next();
      const endTime = ms.parse(ms.since(startTime));
      const total = endTime.microseconds + (endTime.milliseconds * 1e3) + (endTime.seconds * 1e6);
      ctx.set('Response-Time', `${total / 1e3}ms`);
    });

  app.use(cors({
    origin: true,
    credentials: true,
  }));

  // Ping
  const ping = (router()).get('/ping', ctx => {
    ctx.body = 'pong2';
  });
  app.use(ping.routes());

  // Services
  services.forEach(service => {
    const api = (router())
      .use(parser())
      .use(async(ctx, next) => {
        try {
          await next();
        } catch (e) {
          if (e.code) ctx.status = e.code || 500;
          ctx.body = e.data || 'Internal error - please try again later.';
          console.log('error ->', e);
        }
      });
    service(api);
    app.use(api.routes());
  });

  qs(app);

  return app.listen(port);
}
