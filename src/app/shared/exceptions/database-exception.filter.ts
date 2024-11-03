import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    // console.log('exception', Object.keys(exception));

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: 'Database Error',
      details: exception.message,
    };

    response.status(status).json(errorResponse);
  }
}
