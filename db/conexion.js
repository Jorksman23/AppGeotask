import { Sequelize } from 'sequelize';
import {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD
} from '../config/config.js';

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
  port: DB_PORT,
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true
  },
  dialectOptions: {
    connectTimeout: 10000
  }
});
