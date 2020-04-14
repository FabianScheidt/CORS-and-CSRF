import { Controller, Header, Get, Post, Request, Response, Options } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('cookie-auth-cors')
export class CookieAuthCorsController {
  private username = 'admin';
  private password = 'admin';
  private sessionSecret = 'super-secure-secret-with-cors';
  private kittens: any[] = [];

  @Options('*')
  @Header('Access-Control-Allow-Origin', 'http://bob.localhost:8080')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  @Header('Access-Control-Allow-Credentials', 'true')
  public sendCorsHeaders() {
    return '';
  }

  @Post('login')
  @Header('Access-Control-Allow-Origin', 'http://bob.localhost:8080')
  @Header('Access-Control-Allow-Credentials', 'true')
  public async login(@Request() request, @Response() response) {
    const body = await readBody(request);
    const credentials = JSON.parse(body);
    if (credentials.username === this.username && credentials.password === this.password) {
      const sessionSecretCookie = 'SESSION-SECRET=' + this.sessionSecret + '; Path=/; Max-Age=300';
      const headers = {
        'Set-Cookie': sessionSecretCookie
      };
      response.writeHead(200, headers).send();
    } else {
      response.status(401).send('Invalid credentials');
    }
  }

  @Get('kittens')
  @Header('Access-Control-Allow-Origin', 'http://bob.localhost:8080')
  @Header('Access-Control-Allow-Credentials', 'true')
  public getKittens(@Request() request, @Response() response) {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else {
      response.json(this.kittens);
    }
  }

  @Post('kittens')
  @Header('Access-Control-Allow-Origin', 'http://bob.localhost:8080')
  @Header('Access-Control-Allow-Credentials', 'true')
  public async setKittens(@Request() request, @Response() response) {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else {
      const body = await readBody(request);
      this.kittens = JSON.parse(body);
      response.json(this.kittens);
      console.log('Kittens set', this.kittens);
    }
  }

  @Post('logout')
  @Header('Access-Control-Allow-Origin', 'http://bob.localhost:8080')
  @Header('Access-Control-Allow-Credentials', 'true')
  public logout(@Request() request, @Response() response)  {
    if (request.cookies['SESSION-SECRET'] !== this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else {
      const sessionSecretCookie = 'SESSION-SECRET=' + this.sessionSecret + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const headers = { 'Set-Cookie': sessionSecretCookie };
      response.writeHead(200, headers).send();
    }
  }
}
