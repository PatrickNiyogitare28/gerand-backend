import { Injectable, UnauthorizedException, InternalServerErrorException} from '@nestjs/common';
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

  async login(email: string, password: string){
      const user = await this.userModel.findOne({email: email});
      if(!user)
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

  private async signToken(user){
   try{
    const payload = await _.pick(user,['email','firstname','lastname','createdDate','accountType','userType','accountStatus'] ) 
    const access_token = await this.jwtService.sign(payload);
    return [payload, access_token]
   }
  catch(e){
      throw new InternalServerErrorException(e);
  }
 } 
}