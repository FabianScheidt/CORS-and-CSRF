import { Module } from '@nestjs/common';
import { EchoController } from './echo/echo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/'
    })
  ],
  controllers: [
    EchoController
  ],
  providers: [],
})
export class AppModule {}
