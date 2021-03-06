import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './../users/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt'
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.PORT,
    }),
  ],
  controllers: [],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
