import { VerifyAccount } from './../../dist/users/verifyAccount.modal.d';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailingService } from './mailing.service';
import {MongooseModule} from '@nestjs/mongoose';
import {verifyAccountSchema} from '../users/verifyAccount.model';

@Module({
  imports: [
  MongooseModule.forFeature([{name: 'VerifyAccount', schema: verifyAccountSchema}]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        user: 'patrickniyogitare28@gmail.com',
        pass: 'vernompack'
      }
    },
    defaults: {
      from: '"nest-modules" patrickniyogitare28@gmail.com',
    },
    template: {
      dir: 'src/templates/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  })
  ],
  providers: [MailingService]
})
export class MailingModule {}
