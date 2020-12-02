import {NotAcceptableException} from '@nestjs/common';
import {User} from './user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as _ from 'lodash';
import {MailingService} from '../mailing/mailing.service';
import { Enum } from 'nestjs-dotenv';
import {AccountType} from '../utils/enums/accountType';

const {hashPassword} = require('../utils/hashes/password.hash');
export class UserService{
    
    constructor(
        @InjectModel('User') private readonly UserModele: Model<User>,
        private readonly mailingService: MailingService
    ){}

     async createUser(data:any, accType: AccountType){
       let {email,firstname,lastname,password,accountType} = data;  
       
       const userExist = await this.findUserByEmail(email);
       if(userExist.found && userExist.user.accountStatus == 1) 
       throw new NotAcceptableException('User already exist');

       if(accType == AccountType.email){
           return this.createUserWithEmail(data);
       }
       else if(accType == AccountType.google){
          return this.createUserWithGoogle(data);
       }
    }
   
    
    async createUserWithEmail(data){
       let {email,firstname,lastname,password,accountType} = data;  
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

    async createUserWithGoogle(data){
        let {email,firstname,lastname,accountType} = data;  
        const accountStatus = 1;
        const newUser = await new this.UserModele({email,firstname,lastname,accountType,accountStatus});
        const result = await newUser.save();  
        return {
            success: true,
            message: 'User registered successfully',
            user: _.pick(result,['_id','email','firstname','lastname','createdDate','accountType','userType','accountStatus'])
        }; 
    }

    async findUserByEmail(email: string){
        const user = await this.UserModele.findOne({email: email});
        if(user)
        return {
            found: true,
            user
        }

        return{
            found: false
        }
    }
}