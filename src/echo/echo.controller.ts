import { Controller, Get, Post, Request, Response } from '@nestjs/common';

@Controller('echo')
export class EchoController {

  @Get()
  @Post()
  public respondEcho(@Request() req, @Response() res) {
    let bodyChunks = [];
    req.on('data', (chunk) => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      const body = Buffer.concat(bodyChunks).toString();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello ' + body + '!');
    });
  }
}
