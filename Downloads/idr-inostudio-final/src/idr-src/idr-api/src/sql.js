import { QueryFile } from 'pg-promise';
import path from 'path';

import { db } from './db';

/**
 * Loads .sql query file and returns the minified query
 * @param {string} file - Filename to be appended to ./sql/
 */
function sql(file) {
  const fullPath = path.join(__dirname, 'sql/', file);
  return new QueryFile(fullPath, { minify: true });
}

/**
 * Converts array to JSONB compatible array, or returns null
 * @param {object} col - Column object for use with `init` function
 */
function toJSONBArray(col) {
  if (col.exists && Array.isArray(col.source.tags)) {
    return JSON.stringify([...new Set(col.source.tags)]);
  }
  return null;
}

export default {
  users: {
    selectById: sql('users/selectById.sql'),
    selectByEmail: sql('users/selectByEmail.sql'),
  },
  recalls: {
    total: sql('recalls/total.sql'),
    selectByIdAndUser: sql('recalls/selectByIdAndUser.sql'),
    getOnUser: sql('recalls/getOnUser.sql'),
    deleteOnIds: sql('recalls/deleteOnIds.sql'),
    deleteAll: sql('recalls/deleteAll.sql'),
    search: {
      all: {
        results: sql('recalls/search/all/results.sql'),
        match: sql('recalls/search/all/match.sql'),
        question: sql('recalls/search/all/question.sql'),
        updated: sql('recalls/search/all/updated.sql'),
      },
      text: {
        results: sql('recalls/search/text/results.sql'),
        match: sql('recalls/search/text/match.sql'),
        question: sql('recalls/search/text/question.sql'),
        updated: sql('recalls/search/text/updated.sql'),
      },
    },
    getTags: sql('recalls/getTags.sql'),
    columns: {
      update: new db.helpers.ColumnSet([
        'question_plain',
        'question_html',
        'answer_plain',
        'answer_html',
        {
          name: 'tags',
          cast: 'jsonb',
          def: [],
          init: toJSONBArray,
        },
        {
          name: 'deadlines',
          cast: 'jsonb',
          def: [],
          init(col) {
            return JSON.stringify(col.value);
          },
        },
        {
          name: 'updated_at',
          cast: 'timestamp',
        },
      ], {
        table: 'recalls',
      }),
      insert: new db.helpers.ColumnSet([
        {
          name: 'id',
          cast: 'uuid',
        },
        {
          name: 'user_id',
          cast: 'uuid',
        },
        {
          name: 'deleted',
          cast: 'boolean',
          def: false,
        },
        'question_plain',
        'question_html',
        'answer_plain',
        'answer_html',
        {
          name: 'tags',
          cast: 'jsonb',
          def: [],
          init: toJSONBArray,
        },
        {
          name: 'deadlines',
          cast: 'jsonb',
          def: [],
          init(col) {
            return JSON.stringify(col.value);
          },
        },
        {
          name: 'created_at',
          cast: 'timestamp',
        },
        {
          name: 'updated_at',
          cast: 'timestamp',
        },
      ], {
        table: 'recalls',
      }),
    },
  },
  docs: {
    insert: sql('docs/insert.sql'),
    getOnUser: sql('docs/getOnUser.sql'),
  }
};
