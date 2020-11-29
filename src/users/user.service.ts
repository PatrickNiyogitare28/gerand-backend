import {NotAcceptableException} from '@nestjs/common';
import {User} from './user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import _ = require("lodash");

const {hashPassword} = require('../utils/hashes/password.hash');
export class UserService{
    
    constructor(@InjectModel('User') private readonly UserModele: Model<User>){}

     async createUser(data:any){
       let {email,firstname,lastname,password,accountType} = data;  

       const userExist = await this.findUserByEmail(email);
       if(userExist.found)
       throw new NotAcceptableException('User already exist');

       password = await hashPassword(password);
       const newUser = await new this.UserModele({email,firstname,lastname,password,accountType});
       const result = await newUser.save();
        return {
                success: true,
                message: 'User created',
                user: result
            };
    }

    private async findUserByEmail(email: string){
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