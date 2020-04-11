import { Controller, Get, Header } from '@nestjs/common';

@Controller('cors-with-xhr')
export class CorsWithXhrController {

  private readonly kittens: any[] = [
    {
      name: 'Tigger',
      color: 'brown'
    },
    {
      name: 'Kitty',
      color: 'black'
    },
    {
      name: 'Simba',
      color: 'yellow'
    }
  ];

  @Get('no-header')
  getKittens(): any[] {
    return this.kittens;
  }

  @Get('cors-header')
  @Header('Access-Control-Allow-Origin', '*')
  getCorsKittens(): any[] {
    return this.kittens;
  }
}
