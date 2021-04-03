import express from 'express';
import * as UserService from '../services/user-service';
import { createValidator } from 'express-joi-validation';
import { CreateUserSchema, UpdateUserSchema } from '../utils/user-schemas';
import { errorHandler } from '../utils/error-handler';

const router = express.Router();
const validator = createValidator();

router.get('/api/users', (req, res) => {
  UserService.getUsers().then(
    response => res.status(200).json(response),
    err => errorHandler(err, res),
  );
});

router.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  UserService.getUserById(id).then(
    response => res.status(200).json(response),
    err => errorHandler(err, res),
  );
});

router.post('/api/user',
  validator.body(CreateUserSchema),
  (req, res) => {
    UserService.createUser(req.body).then(
      response => res.status(200).json(response),
      err => errorHandler(err, res),
    );
  });

router.put('/api/user',
  validator.body(UpdateUserSchema),
  (req, res) => {
    UserService.updateUser(req.body).then(
      response => res.status(200).json(response),
      err => errorHandler(err, res),
    );
  });

router.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  UserService.deleteUser(id).then(
    response => res.status(200).json(response),
    err => errorHandler(err, res),
  );
});

export { router as UserRoutes }