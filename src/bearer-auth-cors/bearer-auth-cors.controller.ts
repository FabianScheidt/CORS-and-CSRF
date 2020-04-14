import { Controller, Get, Header, Options, Post, Request, Response } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('bearer-auth-cors')
export class BearerAuthCorsController {
  private username = 'admin';
  private password = 'admin';
  private sessionSecret = 'super-secure-bearer-secret';
  private kittens: any[] = [];

  @Options('*')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  public sendCorsHeaders() {
    return '';
  }

  @Post('login')
  @Header('Access-Control-Allow-Origin', '*')
  public async login(@Request() request, @Response() response) {
    const body = await readBody(request);
    const credentials = JSON.parse(body);
    if (credentials.username === this.username && credentials.password === this.password) {
      response.status(200).json({ sessionSecret: this.sessionSecret });
    } else {
      response.status(401).send('Invalid credentials');
    }
  }

  @Get('kittens')
  @Header('Access-Control-Allow-Origin', '*')
  public getKittens(@Request() request, @Response() response) {
    if (request.headers['authorization'] !== 'Bearer ' + this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else {
      response.json(this.kittens);
    }
  }

  @Post('kittens')
  @Header('Access-Control-Allow-Origin', '*')
  public async setKittens(@Request() request, @Response() response) {
    if (request.headers['authorization'] !== 'Bearer ' + this.sessionSecret) {
      response.status(401).send('Invalid session secret');
    } else {
      const body = await readBody(request);
      this.kittens = JSON.parse(body);
      response.json(this.kittens);
      console.log('Kittens set', this.kittens);
    }
  }
}
