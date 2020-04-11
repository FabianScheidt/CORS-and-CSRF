import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(port) {
  const app = await NestFactory.create(AppModule);
  (app as any).disable('x-powered-by');
  await app.listen(port);
}
bootstrap(4200);
bootstrap(8080);
