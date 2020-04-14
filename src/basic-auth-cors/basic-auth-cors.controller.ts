import { Controller, Get, Header, Options, Post, Request, Response } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('basic-auth-cors')
export class BasicAuthCorsController {
  private username = 'admin';
  private password = 'admin';
  private kittens: any[] = [];

  @Options('*')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  public sendCorsHeaders() {
    return '';
  }

  @Get('kittens')
  @Header('Access-Control-Allow-Origin', '*')
  public getKittens(@Request() request, @Response() response) {
    const credentials = Buffer.from(this.username + ':' + this.password).toString('base64');
    if (request.headers['authorization'] !== 'Basic ' + credentials) {
      response.status(401).send('Invalid credentials');
    } else {
      response.json(this.kittens);
    }
  }

  @Post('kittens')
  @Header('Access-Control-Allow-Origin', '*')
  public async setKittens(@Request() request, @Response() response) {
    const credentials = Buffer.from(this.username + ':' + this.password).toString('base64');
    if (request.headers['authorization'] !== 'Basic ' + credentials) {
      response.status(401).send('Invalid credentials');
    } else {
      const body = await readBody(request);
      this.kittens = JSON.parse(body);
      response.json(this.kittens);
      console.log('Kittens set', this.kittens);
    }
  }
}
