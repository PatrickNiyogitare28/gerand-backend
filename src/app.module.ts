// import * as dotenv from 'dotenv';
import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-dotenv';

@Module({
  imports: [UserModule,ConfigModule.forRoot(`src/config/${process.env.NODE_ENV}.env`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
