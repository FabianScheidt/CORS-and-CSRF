import { Module } from '@nestjs/common';
import { EchoController } from './echo/echo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CorsWithXhrController } from './cors-with-xhr/cors-with-xhr.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/'
    })
  ],
  controllers: [
    EchoController,
    CorsWithXhrController
  ],
  providers: [],
})
export class AppModule {}
