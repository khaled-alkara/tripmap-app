// src/config/database.ts
import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME || 'tripmap';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // set to console.log to see SQL queries
});

export default sequelize;