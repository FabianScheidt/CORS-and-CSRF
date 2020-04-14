import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EchoController } from './echo/echo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CorsWithXhrController } from './cors-with-xhr/cors-with-xhr.controller';
import { CookieAuthController } from './cookie-auth/cookie-auth.controller';
import { CookieAuthWithCsrfProtectionController } from './cookie-auth-with-csrf-protection/cookie-auth-with-csrf-protection.controller';
import { CookieAuthCorsController } from './cookie-auth-cors/cookie-auth-cors.controller';
import { LoggerMiddleware } from './logger.middleware';
import { BearerAuthCorsController } from './bearer-auth-cors/bearer-auth-cors.controller';
import { BasicAuthCorsController } from './basic-auth-cors/basic-auth-cors.controller';

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
    CookieAuthWithCsrfProtectionController,
    BearerAuthCorsController,
    BasicAuthCorsController
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
