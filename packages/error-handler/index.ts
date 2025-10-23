export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(message: string, statusCode: number, isOperational: boolean = true, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

// validation error (use for Joi/zod/react-hook-form validation errors)
export class ValidationError extends AppError {
  constructor(message = 'Invalid request data.', details?: any) {
    super(message, 400, true, details);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Unauthorized.') {
    super(message, 401);
  }
}

// forbidden error (for insufficient permissions)
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden.') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resources not found.') {
    super(message, 404);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later!') {
    super(message, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database error.', details?: any) {
    super(message, 500, true, details);
  }
}
