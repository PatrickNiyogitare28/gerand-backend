import {NotAcceptableException} from '@nestjs/common';
import {User} from './user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as _ from 'lodash';
import {MailingService} from '../mailing/mailing.service';

const {hashPassword} = require('../utils/hashes/password.hash');
export class UserService{
    
    constructor(
        @InjectModel('User') private readonly UserModele: Model<User>,
        private readonly mailingService: MailingService
    ){}

     async createUser(data:any){
       let {email,firstname,lastname,password,accountType} = data;  

       const userExist = await this.findUserByEmail(email);
       if(userExist.found && userExist.user.accountStatus == 1)
       throw new NotAcceptableException('User already exist');

       password = await hashPassword(password);
       const newUser = await new this.UserModele({email,firstname,lastname,password,accountType});
       const result = await newUser.save();
       await this.mailingService.sendEmailVerification(result._id,firstname,email);
       return {
                success: true,
                message: 'User registered and Verification code sent to '+email,
                user: _.pick(result,['_id','email','firstname','lastname','createdDate','accountType','userType','accountStatus'])
            };
    }

    async findUserByEmail(email: string){
        const user = await this.UserModele.findOne({email: email});
        if(user)
        return {
            found: true,
            user: user
        }

        return{
            found: false
        }
    }
}