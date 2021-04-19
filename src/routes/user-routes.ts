import express from 'express';
import { createValidator } from 'express-joi-validation';
import { CreateUserSchema, UpdateUserSchema, UsersQuerySchema } from '../utils/user-schemas';
import { createErrorMessage, errorHandler } from '../utils/error-handler';
import { Constants } from '../utils/constants';
import UserService from '../services/user-service';
import { User } from '../models/user.model';

const router = express.Router();
const validator = createValidator();
const userService = new UserService(User);

/* GET users list */
router.get('/api/users',
  validator.query(UsersQuerySchema),
  async (req, res) => {
    try {
      const { loginSubstring, order, includeDeleted, limit } = req.query || {};
      const response = await userService.getUsers(loginSubstring?.toString(),
        order?.toString(),
        (includeDeleted === 'true'),
        (limit && parseInt(limit as string, 10)) || undefined);

      console.log(JSON.stringify(response));

      res.status(Constants.HTTP_OK).json(response);
    } catch (err) {
      errorHandler(err, res);
    }
  });

/* GET user by ID */
router.get('/api/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (!isNaN(userId)) {
      const response = await userService.getUserById(userId);

      console.log(JSON.stringify(response));

      if (response) {
        res.status(Constants.HTTP_OK).json(response);
      } else {
        const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
        errorHandler(error, res);
      }
    } else {
      const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
      errorHandler(error, res);
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

/* POST create new user */
router.post('/api/user',
  validator.body(CreateUserSchema),
  async (req, res) => {
    try {
      const { login, password, age } = req.body;
      const response = await userService.createUser({ login, password, age });

      console.log(JSON.stringify(response));

      if (response) {
        res.status(Constants.HTTP_CREATED).json(response);
      }
    } catch (err) {
      errorHandler(err, res);
    }
  });

/* PUT update existing user */
router.put('/api/user/:id',
  validator.body(UpdateUserSchema),
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);

      if (!isNaN(userId)) {
        const { login, password, age } = req.body;

        const user = await userService.getUserById(userId);

        if (user) {
          const response = await userService.updateUser(userId, { login, password, age });

          console.log(JSON.stringify(response));

          if (response) {
            const updatedRows = response[1];
            res.status(Constants.HTTP_OK).json(updatedRows[0]);
          }
        } else {
          const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
          errorHandler(error, res);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
        errorHandler(error, res);
      }
    } catch (err) {
      errorHandler(err, res);
    }
  });

/* DELETE soft delete existing user */
router.delete('/api/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (!isNaN(userId)) {
      const user = await userService.getUserById(userId);

      if (user) {
        const response = await userService.deleteUser(userId);

        console.log(JSON.stringify(response));

        if (response) {
          const updatedRows = response[1];
          res.status(Constants.HTTP_OK).json(updatedRows[0]);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
        errorHandler(error, res);
      }
    } else {
      const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
      errorHandler(error, res);
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

export { router as UserRoutes };
