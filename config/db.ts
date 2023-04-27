// config/db.ts
import knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const db = knex(config);
export default db;
