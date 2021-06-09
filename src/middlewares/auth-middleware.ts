import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Constants } from '../utils/constants';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const privateKey = 's3cr3t';
    jwt.verify(authorization.split(' ')[1], privateKey, (err: any) => {
      if (err) {
        return res.status(Constants.HTTP_FORBIDDEN).send('Invalid authorization token.');
      }
      next();
    });
  } else {
    res.status(Constants.HTTP_UNAUTHORIZED).send('Missing authorization token.');
  }
};
