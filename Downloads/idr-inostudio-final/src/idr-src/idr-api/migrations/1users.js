module.exports = {
  async up(knex) {
    await knex.schema.raw(`CREATE TABLE public.users
      (
        id uuid NOT NULL,
        email citext COLLATE pg_catalog."default" NOT NULL,
        password text COLLATE pg_catalog."default" NOT NULL,
        first_name citext COLLATE pg_catalog."default" NOT NULL,
        last_name citext COLLATE pg_catalog."default" NOT NULL,
        created_at timestamp without time zone NOT NULL,
        updated_at timestamp without time zone NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT email UNIQUE (email)
      )
      WITH (
        OIDS = FALSE
      )
      TABLESPACE pg_default;
      ALTER TABLE public.users OWNER to postgres;
      COMMENT ON TABLE public.users IS 'Users';
    `);
  },
  async down(knex) {
    return knex.schema.dropTable('users');
  },
};
