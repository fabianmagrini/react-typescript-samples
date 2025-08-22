import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/types';

export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Default error
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'Internal Server Error';

  // Handle known operational errors
  if (error.isOperational) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Invalid input data';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  const apiError: ApiError = {
    message,
    code,
    ...(process.env.NODE_ENV === 'development' && { details: err.stack }),
  };

  res.status(statusCode).json({
    success: false,
    error: apiError,
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const error: ApiError = {
    message: `Route ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND',
  };

  res.status(404).json({
    success: false,
    error,
  });
};