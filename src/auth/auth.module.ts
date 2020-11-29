import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './../users/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt'
import { AuthService } from './auth.service';
import {JwtConstantModule} from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.PORT,
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
