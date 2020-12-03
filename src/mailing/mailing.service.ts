import { User } from './../users/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException, NotFoundException, NotAcceptableException, BadRequestException } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {VerifyAccount} from '../users/verifyAccount.model';
import {Model} from 'mongoose';
import {AuthService} from '../auth/auth.service';
const {generateRandomCode} = require('../utils/randoms/email-verification-code');
@Injectable()
export class MailingService {
    constructor(
      private readonly mailerService: MailerService,
      @InjectModel('VerifyAccount') private readonly VerifyAccountModel: Model<VerifyAccount>,
      @InjectModel('User') private readonly UserModel: Model<User>,
      private readonly authService: AuthService
      ){}

    public async sendEmailVerification(userId:string,firstname: string, email: string) {
        const verificationCode = await this.signVerificationCode(userId);

        if(!verificationCode)
        throw new InternalServerErrorException('Verfication code not sent');

        this
          .mailerService
          .sendMail({
            to: email,
            from: process.env.EMAIL_USER, 
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

      public async verifyEmail(userId: string, code: number){
          const verificationPayload = await this.VerifyAccountModel.findOne({userId: userId});
          if(!verificationPayload)
          throw new NotFoundException('User account not found');

          if(verificationPayload.isVerified == true)
          throw new BadRequestException('Email aready verified');
           
          if(verificationPayload.verificationCode != code)
          throw new BadRequestException('Invalid verification code');
          
          try{
           const user = await this.UserModel.findOne({_id: userId});
           const isEmailUsed = await this.UserModel.findOne({email: user.email, accountStatus:1});
           if(isEmailUsed)
           throw new NotAcceptableException('Email already used');

           await this.UserModel.findOneAndUpdate({_id: userId},{accountStatus: 1});
           await this.VerifyAccountModel.findOneAndUpdate({userId: userId}, {isVerified: true});
           
           user.accountStatus=1;
           const [payload, access_token] = await this.authService.signToken(user);
           return {
               success: true,
               message: 'Successful email verification',
               user: payload,
               access_token: access_token
           }

          }
          catch(e){
            throw new InternalServerErrorException(e);
          }
          
          
      }
}
