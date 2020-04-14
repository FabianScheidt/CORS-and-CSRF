import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap(port) {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Add cookie parser middleware
  app.use(cookieParser());

  // Do not send X-Powered-By header
  (app as any).disable('x-powered-by');
  await app.listen(port);
}
bootstrap(4200);
bootstrap(8080);
