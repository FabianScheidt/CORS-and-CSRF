import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('cookie-auth')
export class CookieAuthController {
  private username = 'admin';
  private password = 'admin';
  private sessionSecret = 'super-secure-secret';
  private kittens: any[] = [];

  @Post('login')
  public async login(@Request() request, @Response() response) {
    const body = await readBody(request);
    const credentials = JSON.parse(body);
    if (credentials.username === this.username && credentials.password === this.password) {
      const setCookie = 'sessionSecret=' + this.sessionSecret + '; Max-Age=300';
      const headers = { 'Set-Cookie': setCookie };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send();
    }
  }

  @Get('kittens')
  public getKittens(@Request() request, @Response() response) {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      response.json(this.kittens);
    } else {
      response.status(401).send();
    }
  }

  @Post('kittens')
  public async setKittens(@Request() request, @Response() response) {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      const body = await readBody(request);
      this.kittens = JSON.parse(body);
      response.json(this.kittens);
    } else {
      response.status(401).send();
    }
  }

  @Post('logout')
  public logout(@Request() request, @Response() response)  {
    if (request.cookies.sessionSecret === this.sessionSecret) {
      const setCookie = 'sessionSecret=' + this.sessionSecret + '; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const headers = { 'Set-Cookie': setCookie };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send();
    }
  }
}
