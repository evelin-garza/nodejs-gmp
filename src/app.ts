import express, { json, urlencoded } from 'express';
import { UserRoutes } from './routes/user-routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/users', UserRoutes);

export { app };
