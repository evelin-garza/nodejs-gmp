import express from 'express';
import { createValidator } from 'express-joi-validation';
import { CreateUserSchema, UpdateUserSchema, UsersQuerySchema, AddUsersToGroupSchema } from '../utils/user-schemas';
import { createErrorMessage, errorHandler } from '../utils/error-handler';
import { Constants } from '../utils/constants';
import UserService from '../services/user-service';
import { User } from '../models/user.model';
import { LoggerMiddleware } from '../middlewares/logger-middleware';
import { isAuthenticated } from '../middlewares/auth-middleware';

const router = express.Router();
const validator = createValidator();
const userService = new UserService(User);

/* GET users list */
router.get('/',
  LoggerMiddleware,
  isAuthenticated,
  validator.query(UsersQuerySchema),
  async (req, res) => {
    try {
      const { loginSubstring, order, includeDeleted, limit } = req.query || {};
      const response = await userService.getUsers(loginSubstring?.toString(),
        order?.toString(),
        (includeDeleted === 'true'),
        (limit && parseInt(limit as string, 10)) || undefined);

      res.status(Constants.HTTP_OK).json(response);
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

/* GET user by ID */
router.get('/:id',
  LoggerMiddleware,
  isAuthenticated,
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (!isNaN(userId)) {
        const response = await userService.getUserById(userId);
        if (response) {
          res.status(Constants.HTTP_OK).json(response);
        } else {
          const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
          errorHandler(error, res, req);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
        errorHandler(error, res, req);
      }
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

/* POST create new user */
router.post('/',
  LoggerMiddleware,
  isAuthenticated,
  validator.body(CreateUserSchema),
  async (req, res) => {
    try {
      const { login, password, age } = req.body;
      const response = await userService.createUser({ login, password, age });
      if (response) {
        res.status(Constants.HTTP_CREATED).json(response);
      }
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

/* PUT update existing user */
router.put('/:id',
  LoggerMiddleware,
  isAuthenticated,
  validator.body(UpdateUserSchema),
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (!isNaN(userId)) {
        const { login, password, age } = req.body;
        const user = await userService.getUserById(userId);
        if (user) {
          const response = await userService.updateUser(userId, { login, password, age });
          if (response) {
            const updatedRows = response[1];
            res.status(Constants.HTTP_OK).json(updatedRows[0]);
          }
        } else {
          const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
          errorHandler(error, res, req);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
        errorHandler(error, res, req);
      }
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

/* DELETE soft delete existing user */
router.delete('/:id',
  LoggerMiddleware,
  isAuthenticated,
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (!isNaN(userId)) {
        const user = await userService.getUserById(userId);
        if (user) {
          const response = await userService.deleteUser(userId);
          if (response) {
            const updatedRows = response[1];
            res.status(Constants.HTTP_OK).json(updatedRows[0]);
          }
        } else {
          const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No user found with id: ${userId}.`);
          errorHandler(error, res, req);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_BAD_REQUEST, Constants.BAD_REQUEST_ERROR, 'Id must be an integer');
        errorHandler(error, res, req);
      }
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

/* Add users to group */
router.post('/addToGroup',
  LoggerMiddleware,
  isAuthenticated,
  validator.body(AddUsersToGroupSchema),
  async (req, res) => {
    try {
      const { groupId, userIds } = req.body;
      const response = await userService.addUsersToGroup(groupId, userIds);
      res.status(201).send(response);
    } catch (err) {
      errorHandler(err, res, req);
    }
  });

export { router as UserRoutes };
