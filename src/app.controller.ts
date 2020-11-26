import { Controller, Get } from '@nestjs/common';
import { ConfigService } from 'nestjs-dotenv';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,  private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get('PORT'));
    return this.appService.getHello();
  }
}
