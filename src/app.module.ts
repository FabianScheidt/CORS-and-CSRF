import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EchoController } from './echo/echo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CorsWithXhrController } from './cors-with-xhr/cors-with-xhr.controller';
import { CookieAuthController } from './cookie-auth/cookie-auth.controller';
import { CookieAuthWithCsrfProtectionController } from './cookie-auth-with-csrf-protection/cookie-auth-with-csrf-protection.controller';
import { CookieAuthCorsController } from './cookie-auth-cors/cookie-auth-cors.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/'
    })
  ],
  controllers: [
    EchoController,
    CorsWithXhrController,
    CookieAuthController,
    CookieAuthCorsController,
    CookieAuthWithCsrfProtectionController
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
