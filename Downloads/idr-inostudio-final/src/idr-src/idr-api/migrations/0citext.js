module.exports = {
  async up(knex) {
    await knex.schema.raw('CREATE EXTENSION citext');
  },
  async down(knex) {
    await knex.schema.raw('DROP EXTENSION citext');
  },
};
