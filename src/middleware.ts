import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const referer = req.get('referer') || '';
    const ip = req.ip;
    const params = JSON.stringify(req.params);
    const query = JSON.stringify(req.query);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const requestBody = JSON.stringify(req.body);

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${referer} ${ip} ${params} ${query} ${requestBody}`,
      );
    });

    next();
  }
}
