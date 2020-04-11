import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { readBody } from '../utils/read-body';

@Controller('echo')
export class EchoController {

  @Get()
  public noEcho(@Response() response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello !');
  }

  @Post()
  public async respondEcho(@Request() request, @Response() response) {
    const body = await readBody(request);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello ' + body + '!');
  }
}
