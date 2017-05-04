import { authenticate } from '../middleware';
import parser from 'koa-body';

const koaBody = parser({ multipart: true });

import {
  upload,
  getForCurrentUser,
} from '../models/doc';

/**
 * Defines REST routes on the router
 * @param {object} router - Router instance
 */
export default function(router) {
  router
    .use(authenticate)
    .get('/docs', getForCurrentUser)
    .post('/docs/upload', koaBody, upload);
}
