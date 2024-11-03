import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AwsExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal Server Error';

    if (
      exception &&
      typeof exception === 'object' &&
      'code' in exception &&
      'message' in exception
    ) {
      const awsError = exception as { code: string; message: string };

      switch (awsError.code) {
        case 'ResourceNotFoundException':
          message = 'Resource not found';
          break;
        case 'InvalidParameterException':
          message = 'Invalid parameters';
          break;
        case 'AccessDeniedException':
          message = 'Access denied';
          break;

        default:
          message = awsError.message;
          break;
      }

      console.error('AWS exception:', awsError);

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message,
        error: awsError.message,
        code: awsError.code,
      });
    } else {
      // Handle other exceptions
      console.error('Non-AWS exception:', exception);

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: 'An unexpected error occurred',
      });
    }
  }
}
