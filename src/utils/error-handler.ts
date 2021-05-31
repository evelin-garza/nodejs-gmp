import { Response, Request } from 'express';
import { CustomError } from '../types/error';
import { Constants } from './constants';
import { logger } from '../services/logger-service';

export const createErrorMessage = (
  status: number,
  error: string,
  message: string,
  path?: string): CustomError => {
  return {
    timestamp: new Date(),
    status,
    error,
    message,
    path
  };
};

export const errorHandler = (err: CustomError, res: Response, req: Request): void => {
  logError(err.message || Constants.INTERNAL_SERVER_ERROR, req);

  if (err.status) {
    res.status(err.status).json(err);
  } else {
    res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).json({
      status: Constants.HTTP_INTERNAL_SERVER_ERROR,
      error: Constants.INTERNAL_SERVER_ERROR
    });
  }
};

const logError = (errorMessage: string, req: Request) => {
  const { params, query, body } = req;

  logger.error(JSON.stringify({
    method: req.method,
    arguments: {
      params,
      query,
      body
    },
    error: errorMessage
  }));
};
