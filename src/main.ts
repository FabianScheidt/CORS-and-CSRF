import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap(port) {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(cookieParser());
  (app as any).disable('x-powered-by');
  await app.listen(port);
}
bootstrap(4200);
bootstrap(8080);
