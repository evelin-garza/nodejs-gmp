/* eslint-disable no-sync */
import { app } from './app';
import { db } from './models';

const port = 3000;

const startServer = async () => {
  try {
    await db.sync({ force: true });

    console.log('Database connection successfully');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Unable to connect to database.');
    console.error(e);
  }
};

startServer();
