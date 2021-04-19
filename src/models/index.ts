import { Sequelize } from 'sequelize';

export const db = new Sequelize('postgres://pjrasmcx:5mOsRuv0RqXIxnsG8bSG9dBSLZc_X7Ms@queenie.db.elephantsql.com:5432/pjrasmcx', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});
