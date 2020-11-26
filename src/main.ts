// import * as dotenv from 'dotenv';
// require(dotenv.config({path: `config/${process.env.NODE_ENV}.env`})) ; 


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(process.env.PORT);
  await app.listen(3000);
}
bootstrap();
