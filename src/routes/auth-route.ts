import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import AuthService from '../services/auth-service';
import { Constants } from '../utils/constants';

const router = express.Router();
const authService = new AuthService(User);

router.post('/login', async (req, res) => {
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
  }
});

export { router as AuthRoutes };
