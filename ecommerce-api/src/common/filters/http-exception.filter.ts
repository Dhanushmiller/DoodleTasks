import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception.message };

    const message = (errorResponse as any).message || errorResponse;

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message[0] : message,
      error: (errorResponse as any).error || 'Internal Server Error',
      statusCode: status,
    });
  }
}
