module.exports = {
  async up(knex) {
    return knex.schema.raw(`
      CREATE TABLE public.recalls
      (
        id uuid NOT NULL,
        user_id uuid,
        deleted boolean,
        question_plain text COLLATE pg_catalog."default",
        question_html text COLLATE pg_catalog."default",
        answer_plain text COLLATE pg_catalog."default",
        answer_html text COLLATE pg_catalog."default",
        tags jsonb,
        deadlines jsonb,
        created_at timestamp without time zone,
        updated_at timestamp without time zone,
        CONSTRAINT recalls_pkey PRIMARY KEY (id),
        CONSTRAINT user_id FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
      )
      WITH (
        OIDS = FALSE
      )
      TABLESPACE pg_default;

      ALTER TABLE public.recalls
          OWNER to postgres;

      COMMENT ON CONSTRAINT user_id ON public.recalls
          IS 'References users.id';

      CREATE INDEX fki_ss
          ON public.recalls USING btree
          (user_id)
          TABLESPACE pg_default;

      CREATE INDEX user_id
          ON public.recalls USING btree
          (user_id)
          TABLESPACE pg_default;

      COMMENT ON INDEX public.user_id
          IS 'Index for foreign key user_id';
    `);
  },
  async down(knex) {
    return knex.schema.dropTable('recalls');
  },
};
