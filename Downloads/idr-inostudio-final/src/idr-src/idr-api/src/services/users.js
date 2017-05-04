import { authenticate } from '../middleware';

import {
  createUser,
  getUser,
  login,
} from '../models/user';

/**
 * Defines REST routes on the router
 * @param {object} router - Router instance
 */
export default function (router) {
  router
    .post('/login', login)
    .get('/user', authenticate, getUser)
    .post('/user', createUser);
}
