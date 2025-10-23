import { AppError } from './index';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    console.error(`Error ${req.method} ${req.url} - ${error.message}`);

    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  console.error('Unhandlerd error:', error);

  return res.status(500).json({
    error: 'Something went wrong. Please try again!',
  });
}
