import express, { json, urlencoded } from 'express';
import { UserRoutes } from './routes/user-routes';

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use(UserRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
