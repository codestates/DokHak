require('dotenv').config();
const env = process.env;

const development = {
  username: 'admin',
  password: 'coding29',
  database: 'dokhak',
  host: 'dokhak-rds.crl0svpcjqya.ap-northeast-2.rds.amazonaws.com',
  port: 13306,
  dialect: 'mysql',
};

const production = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mysql',
};

const test = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mysql',
};

module.exports = { development, production, test };
