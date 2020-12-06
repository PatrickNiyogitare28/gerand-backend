import { Injectable, UnauthorizedException, InternalServerErrorException, Request, BadRequestException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/user.model';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import * as argon from 'argon2';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
 constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
 ){}

  async emailLogin(email: string, password: string){
      const user = await this.userModel.findOne({email: email});
      if(!user || user.accountStatus == 0)
      throw new UnauthorizedException('Invalid credentials');
      
      
      const isPasswordValid = await argon.verify(user.password, password);
      if(!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
      
      const [payload, access_token] = await this.signToken(user);
      return {
          success: true,
          user: payload,
          access_token: access_token
      }
  }     

  public async signToken(user){
   try{
    const payload = await _.pick(user,['_id','email','firstname','lastname','createdDate','accountType','userType','accountStatus'] ) 
    const access_token = await this.jwtService.sign(payload);
    return [payload, access_token]
   }
  catch(e){
      throw new InternalServerErrorException(e);
  }
 } 

  async decodeToken(req){
    try{
        const token = req.header('Bearer-Auth-Token');
        const decoded = await this.jwtService.decode(token);
        return decoded;
    }
    catch(e){
       throw new UnauthorizedException('Invalid token'); 
    }
 }

 async googleLogin(req){
     if(!req.user)
     throw new BadRequestException('Authentication with google failed');

     return {
         success: true,
         user: req.user
     }

 }
zz
 
}
