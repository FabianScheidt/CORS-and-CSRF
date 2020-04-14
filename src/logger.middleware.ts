import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${req.socket.localPort} ${req.method} ${req.url} - ${ms}ms`);
  }
}
