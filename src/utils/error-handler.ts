import { CustomError } from "../models/error";
import { Constants } from "./constants";

export const createErrorMessage = (
  status: number,
  error: string,
  message: string,
  path?: string) => {
  return {
    timestamp: new Date(),
    status,
    error,
    message,
    path
  }
};

export const errorHandler = (err: CustomError, res: any) => {
  if (err.status) {
    res.status(err.status).json(err);
  } else {
    res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).json({
      status: Constants.HTTP_INTERNAL_SERVER_ERROR,
      error: Constants.INTERNAL_SERVER_ERROR
    });
  }
};