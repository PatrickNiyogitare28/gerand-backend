import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware{ 
 constructor(private jwtService: JwtService){}   
 use(req: Request, res: Response, next: Function){
     const token = req.header('Bearer-Auth-Token');
     if(!token)
     throw new UnauthorizedException('Token not found');

     const decode = this.jwtService.decode(token);
     if(!decode)
     throw new UnauthorizedException('Invalid token');
     next();
 }
}