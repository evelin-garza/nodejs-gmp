import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import AuthService from '../services/auth-service';
import { Constants } from '../utils/constants';
import { createValidator } from 'express-joi-validation';
import { LoginSchema } from '../utils/user-schemas';

const router = express.Router();
const authService = new AuthService(User);
const validator = createValidator();

router.post('/login',
  validator.body(LoginSchema),
  async (req, res) => {
    try {
      const { login, password } = req.body;
      const validUser = await authService.findUser(login, password);

      if (validUser) {
        const privateKey = 's3cr3t';
        const accessToken = jwt.sign({ login: validUser.login }, privateKey);
        return res.status(Constants.HTTP_OK).json({ accessToken });
      }

      return res.status(Constants.HTTP_BAD_REQUEST).send('The provided credentials are not valid.');
    } catch (e) {
      console.log(e);
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send(Constants.INTERNAL_SERVER_ERROR);
    }
  });

export { router as AuthRoutes };
