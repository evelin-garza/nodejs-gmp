import { Sequelize } from 'sequelize';
import config from '../config/db.config';

export const db = new Sequelize(config.db, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  logging: false
});
