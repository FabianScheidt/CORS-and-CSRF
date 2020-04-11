import { Module } from '@nestjs/common';
import { EchoController } from './echo/echo.controller';

@Module({
  imports: [],
  controllers: [
    EchoController
  ],
  providers: [],
})
export class AppModule {}
