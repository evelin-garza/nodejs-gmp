import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger-service';
import { performance } from 'perf_hooks';

export const executionTime = (req: Request, res: Response, next: NextFunction): void => {
  const start = performance.now();

  res.on('finish', () => {
    const end = performance.now();
    const duration = end - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} - ${duration} ms`);
  });
  next();
};
