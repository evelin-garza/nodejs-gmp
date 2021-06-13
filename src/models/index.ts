import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Sequelize(process.env.DB as string, process.env.USERNAME as string, process.env.PASSWORD as string, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false
});
