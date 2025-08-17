import { Sequelize } from 'sequelize';

// Railway injects these env vars
const DB_NAME = process.env.MYSQLDATABASE || 'tripmap';
const DB_USER = process.env.MYSQLUSER || 'root';
const DB_PASS = process.env.MYSQLPASSWORD || 'password';
const DB_HOST = process.env.MYSQLHOST || 'localhost';
const DB_PORT = parseInt(process.env.MYSQLPORT || '3306', 10);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    // Optional: for SSL in production
    // ssl: { rejectUnauthorized: false }
  }
});

export default sequelize;
