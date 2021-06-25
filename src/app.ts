import express, { json, urlencoded } from 'express';
import { UserRoutes } from './routes/user-routes';
import { GroupRoutes } from './routes/group-routes';
import { executionTime } from './middlewares/execution-time-middleware';
import { LoggerMiddleware } from './middlewares/logger-middleware';
import { AuthRoutes } from './routes/auth-route';
import cors from 'cors';

const app = express();

app.use(executionTime);
app.use(LoggerMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/groups', GroupRoutes);
app.use('/api/auth', AuthRoutes);

export { app };
