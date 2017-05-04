module.exports = {
  async up(knex) {
    return knex.schema.raw(`
      CREATE TABLE public.docs
      (
          id uuid NOT NULL,
          name text COLLATE pg_catalog."default" NOT NULL,
          path text COLLATE pg_catalog."default" NOT NULL,
          user_id uuid,
          CONSTRAINT docs_pkey PRIMARY KEY (id),
          CONSTRAINT user_id FOREIGN KEY (user_id)
              REFERENCES public.users (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )
      WITH (
          OIDS = FALSE
      )
      TABLESPACE pg_default;
      
      ALTER TABLE public.docs
          OWNER to postgres;
    `);
  },
  async down(knex) {
    return knex.schema.dropTable('docs');
  },
};
