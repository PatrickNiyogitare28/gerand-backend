import { ConfigModule } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { VerifyAccount } from './../../dist/users/verifyAccount.modal.d';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailingService } from './mailing.service';
import {MongooseModule} from '@nestjs/mongoose';
import {verifyAccountSchema} from '../users/verifyAccount.model';
import {UserSchema} from '../users/user.model';
import {AuthService} from '../auth/auth.service';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([
    {name: 'VerifyAccount', schema: verifyAccountSchema},
    {name: 'User', schema: UserSchema}
  ]),
  JwtModule.register({
    secret: process.env.SECRET_KEY,
  }),
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    },
    defaults: {
      from: `"nest-modules" ${process.env.EMAIL_USER}`,
    },
    template: {
      dir: 'src/templates/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  }),
 
  ],
  providers: [MailingService, AuthService]
})
export class MailingModule {}
