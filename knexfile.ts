import { Knex } from 'knex';
import dotenv from "dotenv";

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE
  },
  migrations: {
    directory: './migrations',
    extension: "ts",
  },
  seeds: {
    directory: './seeds'
  }
};

export default config;