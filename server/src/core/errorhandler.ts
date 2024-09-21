import { NextFunction, Request, Response } from "express";
import { HttpStatusCodes, HttpStatusMessages } from "../constants";
import { logger } from "../utils";

class GlobalErrorHandler {
  static handleError(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statusCode =
      error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || HttpStatusMessages.INTERNAL_SERVER_ERROR;
    logger.error(`[Error] ${message}`, error);

    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class BadRequestError extends AppError {
  constructor(
    message = HttpStatusMessages.BAD_REQUEST,
    statusCode = HttpStatusCodes.BAD_REQUEST
  ) {
    super(statusCode, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message = HttpStatusMessages.UNAUTHORIZED,
    statusCode = HttpStatusCodes.UNAUTHORIZED
  ) {
    super(statusCode, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = HttpStatusMessages.FORBIDDEN,
    statusCode = HttpStatusCodes.FORBIDDEN
  ) {
    super(statusCode, message);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message = HttpStatusMessages.NOT_FOUND,
    statusCode = HttpStatusCodes.NOT_FOUND
  ) {
    super(statusCode, message);
  }
}

export class ConflictError extends AppError {
  constructor(
    message = HttpStatusMessages.CONFLICT,
    statusCode = HttpStatusCodes.CONFLICT
  ) {
    super(statusCode, message);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message = HttpStatusMessages.INTERNAL_SERVER_ERROR,
    statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(statusCode, message);
  }
}

export class SecurityBreachError extends AppError {
  constructor(
    message = HttpStatusMessages.SECURITY_BREACH,
    statusCode = HttpStatusCodes.UNAUTHORIZED
  ) {
    super(statusCode, message);
  }
}

export default GlobalErrorHandler;
