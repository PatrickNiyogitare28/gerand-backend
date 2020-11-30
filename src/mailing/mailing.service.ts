import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {VerifyAccount} from '../users/verifyAccount.model';
import {Model} from 'mongoose';
const {generateRandomCode} = require('../utils/randoms/email-verification-code');
@Injectable()
export class MailingService {
    constructor(
      private readonly mailerService: MailerService,
      @InjectModel('VerifyAccount') private readonly VerifyAccountModel: Model<VerifyAccount>
      ){}

    public async sendEmailVerification(userId:string,firstname: string) {
        const verificationCode = await this.signVerificationCode(userId);

        if(!verificationCode)
        throw new InternalServerErrorException('Verfication code not sent');

        this
          .mailerService
          .sendMail({
            to: 'patrickniyogitare28@gmail.com',
            from: 'patrickniyogitare28@gmail.com', 
            subject: 'Gerand Verification email',
            template: 'emailVerification.index.hbs', 
            context: { 
              code: verificationCode.code,
              firstname: firstname,
            },
          })
          .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });
      }

      private async signVerificationCode(userId: string){
           const verificationCode = await generateRandomCode();
           const account = await this.VerifyAccountModel.findOne({_id: userId});

           if(account){
             const newData = {
               userId: account.userId,
               verificationCode: verificationCode,
               isVerified: false
             }
             await account.findOneAndUpdate({_id: userId},newData);
             return {
              success: true,
              code: verificationCode
            }
           }
           const newVerificaton = await new this.VerifyAccountModel({userId,verificationCode});
           await newVerificaton.save();
           return {
             success: true,
             code: verificationCode
           }
      }
}
