import { Controller, Get, Post, Put, Body, Request, Response } from '@nestjs/common';

@Controller('cookie-auth')
export class CookieAuthController {
  private username = 'admin';
  private password = 'admin';
  private sessionSecret = 'super-secure-secret';
  private kittens: any[] = [];

  @Post('login')
  public login(@Body() body, @Response() response): void {
    if (body && body.username === this.username && body.password === this.password) {
      const setCookie = 'sessionSecret=' + this.sessionSecret + '; Max-Age=300';
      const headers = { 'Set-Cookie': setCookie };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send();
    }
  }

  @Get('kittens')
  public getKittens(@Request() request, @Response() response): void {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      response.json(this.kittens);
    } else {
      response.status(401).send();
    }
  }

  @Put('kittens')
  public setKittens(@Request() request, @Body() body, @Response() response): void {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      this.kittens = body;
      response.json(this.kittens);
    } else {
      response.status(401).send();
    }
  }

  @Post('logout')
  public logout(@Request() request, @Response() response): void  {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      const setCookie = 'sessionSecret=' + this.sessionSecret + '; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const headers = { 'Set-Cookie': setCookie };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send();
    }
  }
}
