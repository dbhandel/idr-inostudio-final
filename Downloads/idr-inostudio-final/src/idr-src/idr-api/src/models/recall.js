import pg from 'pg-promise';
import uuid from 'uuid';

import { db, conn } from '../db';
import { formHandler } from '../helpers';
import exceptions from '../exceptions';
import sql from '../sql';

// Schemas
import recallSchema from '../schemas/recall';
import searchSchema from '../schemas/search';

/**
 * Koa Middleware for loading a recall based on param :id
 * @param {object} ctx - Koa context object
 * @param {function} next - Function to call the next middleware in the chain
 */
export async function loadRecall(ctx, next) {
  const form = await formHandler(ctx.params, recallSchema, [
    'id',
  ]);

  // Make sure recall belongs to the current user
  const recall = await conn.oneOrNone(
    sql.recalls.selectByIdAndUser, {
      columns: pg.as.name('id'),
      id: form.get('id'),
      user_id: ctx.state.user.id,
    },
  );

  if (!recall) {
    throw new exceptions.BadRequest({
      id: 'Recall ID not found',
    });
  }

  ctx.state.recall = recall;
  return next();
}

/**
 * Create or update an existing recall
 * @param {object} ctx - Koa context object
 */
export async function createOrUpdateRecall(ctx) {
  const form = await formHandler(ctx.request.body, recallSchema, [
    'questionHTML',
    'answerHTML',
    'tags',
    'deadlines',
  ]);

  const now = new Date();
  const data = {
    id: ctx.state.recall ? ctx.state.recall.id : uuid.v4(),
    user_id: ctx.state.user.id,
    question_plain: form.get('sanitizedQuestionPlain'),
    question_html: form.get('sanitizedQuestionHTML'),
    answer_plain: form.get('sanitizedAnswerPlain'),
    answer_html: form.get('sanitizedAnswerHTML'),
    tags: form.get('tags'),
    deadlines: form.get('parsedDeadlines'),
    updated_at: now,
  };

  // Build the query
  if (ctx.state.recall) {
    ctx.body = await conn.one(
      `${db.helpers.update(data, sql.recalls.columns.update)} WHERE id = $<recall_id> RETURNING *`, {
        recall_id: ctx.state.recall.id,
      },
    );
  } else {
    data.created_at = now;
    ctx.body = await conn.one(
      `${db.helpers.insert(data, sql.recalls.columns.insert)} RETURNING *`,
    );
  }
}

/* DELETE */

/**
 * Delete by a single ID
 * @param {object} ctx - Koa context object
 */
export async function deleteOne(ctx) {
  // 'Soft' delete
  await conn.none(
    sql.recalls.deleteOnIds, {
      user_id: ctx.state.user.id,
      ids: pg.as.text(ctx.state.recall.id),
    },
  );

  ctx.body = {
    success: true,
  };
}

/**
 * Delete on multiple recall IDs
 * @param {object} ctx - Koa context object
 */
export async function deleteByIds(ctx) {
  const form = await formHandler(ctx.request.body, recallSchema, [
    'ids',
  ]);

  // 'Soft' delete
  await conn.none(
   sql.recalls.deleteOnIds, {
     user_id: ctx.state.user.id,
     ids: form.get('ids').map(id => pg.as.text(id)).join(),
   },
  );

  ctx.body = {
    success: true,
  };
}

/**
 * Delete all recalls
 * @param {object} ctx - Koa context object
 */
export async function deleteAll(ctx) {
  await conn.none(
    sql.recalls.deleteAll, {
      user_id: ctx.state.user.id,
    },
  );

  ctx.body = {
    success: true,
  };
}

/**
 * Responds with JSON object containing recalls on search criteria
 * @param {object} ctx - Koa context object
 */
export async function getRecalls(ctx) {
  let query;
  let results = 0;
  let data = [];
  const page = (parseInt(ctx.query.page, 10) || 0);

  const opt = {
    user_id: ctx.state.user.id,
    sort: ctx.query.asc === '1' ? 'asc' : 'desc',
    limit: 25,
    offset: page * 25,
  };

  // Firstly, get the count of recalls.  If there are 0 results, then
  // we won't bother running the other queries
  const total = parseInt((await conn.one(sql.recalls.total, opt)).total, 10) || 0;

  if (total) {
    // Search with text
    if (ctx.query.tags || ctx.query.text) {
      // Validate input
      const form = await formHandler(ctx.query, searchSchema, [
        'tags',
        'text',
      ]);

      // Map the fields to the query
      Object.assign(opt, {
        tags: form.get('parsedTags'),
        text: form.get('parsedText'),
      });

      // Get the total
      results = parseInt((await conn.one(sql.recalls.search.text.results, opt)).results, 10);

      // Switch on the sort column
      switch (ctx.query.column) {
        case 'question': {
          query = conn.manyOrNone(
            sql.recalls.search.text.question, opt,
          );
          break;
        }
        case 'updated': {
          query = conn.manyOrNone(
            sql.recalls.search.text.updated, opt,
          );
          break;
        }
        default: {
          query = conn.manyOrNone(
            sql.recalls.search.text.match, Object.assign(opt, {
              sort: ctx.query.asc === '1' ? 'asc' : 'desc',
            }),
          );
        }
      }
    } else {
      // No tags/search string -- search on all

      // Get the total
      results = parseInt((await conn.one(sql.recalls.search.all.results, opt)).results, 10);

      switch (ctx.query.column) {
        case 'question': {
          query = conn.manyOrNone(
            sql.recalls.search.all.question, opt,
          );
          break;
        }
        case 'updated': {
          query = conn.manyOrNone(sql.recalls.search.all.updated, opt);
          break;
        }

        default: {
          query = conn.manyOrNone(sql.recalls.search.all.match, opt);
        }
      }
    }
    data = await query;
  }

  ctx.body = {
    page,
    total,
    results,
    data,
  };
}

/**
 * Responds with JSON object containing unique recall tags, ordered alphabetically
 * @param {object} ctx - Koa context object
 */
export async function getTags(ctx) {
  ctx.body = (await conn.manyOrNone(
    sql.recalls.getTags, {
      user_id: ctx.state.user.id,
    },
  )).map(row => row.tag);
}
