/* eslint-disable no-sync */
import { app } from './app';
import { db } from './models';
import fs from 'fs';

const port = 3000;
const script = fs.readFileSync('src/data/data-script.sql', 'utf8');

const startServer = async () => {
  try {
    await db.sync({ force: true });
    await db.query(script);

    console.log('Database connection successfully!!');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Unable to connect to database.');
    console.error(e);
  }
};

startServer();
