import { authenticate } from '../middleware';

import {
  getTags,
} from '../models/recall';

/**
 * Defines REST routes on the router
 * @param {object} router - Router instance
 */
export default function (router) {
  router
    .use(authenticate)
    .get('/tags/recall', getTags);
}
