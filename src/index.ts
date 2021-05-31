/* eslint-disable no-sync */
import { app } from './app';
import { db } from './models';
import fs from 'fs';
import { Group } from './models/group.model';
import { User } from './models/user.model';
import { logger } from './services/logger-service';

const port = 3000;
const script = fs.readFileSync('src/data/data-script.sql', 'utf8');

const addAssociations = (): void => {
  Group.belongsToMany(User, { through: 'user_group' });
  User.belongsToMany(Group, { through: 'user_group' });
};

const startServer = async () => {
  try {
    addAssociations();
    await db.sync({ force: true });
    await db.query(script);

    console.log('Database connection successfully!!');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

    process.on('uncaughtException', error => {
      logger.error(error);
    });

    process.on('unhandledRejection', error => {
      logger.error(error);
    });
  } catch (e) {
    console.error('Unable to connect to database.');
    console.error(e);
  }
};

startServer();
