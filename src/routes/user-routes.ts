import express from 'express';
import * as UserService from '../services/user-service';
import { createValidator } from 'express-joi-validation';
import { CreateUserSchema, UpdateUserSchema, UsersQuerySchema } from '../utils/user-schemas';
import { errorHandler } from '../utils/error-handler';
import { Constants } from '../utils/constants';

const router = express.Router();
const validator = createValidator();

/* GET users list */
router.get('/api/users',
  validator.query(UsersQuerySchema),
  (req, res) => {
    UserService.getUsers(req.query).then(
      response => res.status(Constants.HTTP_OK).json(response),
      err => errorHandler(err, res),
    );
  });

/* GET user by ID */
router.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  UserService.getUserById(id).then(
    response => res.status(Constants.HTTP_OK).json(response),
    err => errorHandler(err, res),
  );
});

/* POST create new user */
router.post('/api/user',
  validator.body(CreateUserSchema),
  (req, res) => {
    UserService.createUser(req.body).then(
      response => res.status(Constants.HTTP_CREATED).json(response),
      err => errorHandler(err, res),
    );
  });

/* PUT update existing user */
router.put('/api/user',
  validator.body(UpdateUserSchema),
  (req, res) => {
    UserService.updateUser(req.body).then(
      response => res.status(Constants.HTTP_OK).json(response),
      err => errorHandler(err, res),
    );
  });

/* DELETE soft delete existing user */
router.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  UserService.deleteUser(id).then(
    response => res.status(Constants.HTTP_OK).json(response),
    err => errorHandler(err, res),
  );
});

export { router as UserRoutes };
