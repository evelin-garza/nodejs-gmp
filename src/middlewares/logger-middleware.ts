import { NextFunction, Request, Response } from 'express';
import { logger } from '../services/logger-service';

export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { method, originalUrl, params, query, body } = req;

  logger.info(JSON.stringify({
    method,
    url: originalUrl,
    arguments: {
      params,
      query,
      body
    }
  }));

  next();
};
