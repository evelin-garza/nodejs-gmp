import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger-service';

export const executionTime = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const end = Date.now();
    const duration = end - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} - ${duration} ms`);
  });
  next();
};
