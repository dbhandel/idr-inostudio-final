const jwt = {
  secret: 'tOjB7FXCyU3dvII8kD0sQ1MtTF8DXEg3',
  options: {
    expiresIn: '30d',
  },
};

const s3 = {
  bucket: 'idr.test',
  region: 'us-west-2',
  poolId: 'fb5dc3d5-a7ce-4115-8dcf-c97762b4d0b5',
  access: 'AKIAJXDI3PU2FDZ6A4KQ',
  secret: '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'
};

const config = {
  development: {
    jwt,
    s3: s3,
    db: {
      host: 'postgres',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: false,
    },
  },
  staging: {
    jwt,
    s3: s3,
    db: {
      host: 'localhost',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: false,
    },
  },
};

export default config[process.env.NODE_ENV];
