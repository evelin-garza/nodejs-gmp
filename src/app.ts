import express, { json, urlencoded } from 'express';
import { UserRoutes } from './routes/user-routes';
import { GroupRoutes } from './routes/group-routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/groups', GroupRoutes);

export { app };
