import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('cookie-auth-with-csrf-protection')
export class CookieAuthWithCsrfProtectionController {
  private username = 'admin';
  private password = 'admin';
  private sessionSecret = 'super-secure-secret-with-csrf';
  private xsrfToken = 'some-xsrf-token';
  private kittens: any[] = [];

  @Post('login')
  public async login(@Request() request, @Response() response) {
    const body = await readBody(request);
    const credentials = JSON.parse(body);
    if (credentials.username === this.username && credentials.password === this.password) {
      const sessionSecretCookie = 'SESSION-SECRET=' + this.sessionSecret + '; HttpOnly; Path=/; Max-Age=300';
      const xsrfTokenCookie = 'XSRF-TOKEN=' + this.xsrfToken + '; Path=/; Max-Age=300';
      const headers = {
        'Set-Cookie': [sessionSecretCookie, xsrfTokenCookie]
      };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send('Invalid credentials');
    }
  }

  @Get('kittens')
  public getKittens(@Request() request, @Response() response) {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else if (request.headers['x-xsrf-token'] !== this.xsrfToken) {
      response.status(401).send('Invalid CSRF-Token');
    } else {
      response.json(this.kittens);
    }
  }

  @Post('kittens')
  public async setKittens(@Request() request, @Response() response) {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else if (request.headers['x-xsrf-token'] !== this.xsrfToken) {
      response.status(401).send('Invalid CSRF-Token');
    } else {
      const body = await readBody(request);
      this.kittens = JSON.parse(body);
      response.json(this.kittens);
    }
  }

  @Post('logout')
  public logout(@Request() request, @Response() response)  {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else if (request.headers['x-xsrf-token'] !== this.xsrfToken) {
      response.status(401).send('Invalid CSRF-Token');
    } else {
      const sessionSecretCookie = 'SESSION-SECRET=' + this.sessionSecret + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const xsrfTokenCookie = 'XSRF-TOKEN=' + this.xsrfToken + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const headers = { 'Set-Cookie': [sessionSecretCookie, xsrfTokenCookie] };
      response.writeHead(200, headers).send();
    }
  }
}
