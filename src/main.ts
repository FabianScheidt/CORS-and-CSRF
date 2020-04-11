import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as any).disable('x-powered-by');
  await app.listen(8080);
}
bootstrap();
