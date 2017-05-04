import { authenticate } from '../middleware';

import {
  loadRecall,
  getRecalls,
  createOrUpdateRecall,
  deleteOne,
  deleteByIds,
  deleteAll,
} from '../models/recall';

export default function (router) {
  router
    .use(authenticate)

    // Get recalls
    .get('/recalls', getRecalls)

    // Create/update
    .post('/recall', createOrUpdateRecall)
    .put('/recall/:id', loadRecall, createOrUpdateRecall)

    // Delete recalls
    .delete('/recall/:id', loadRecall, deleteOne)
    .delete('/recalls', deleteAll)
    .post('/recalls/delete', deleteByIds);
}
