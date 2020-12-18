import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import {Request, Response} from 'express';
import {UserType} from '../utils/enums/userType';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware{
    constructor(private readonly jwtService: JwtService){}
    use(req: Request, res: Response, next: Function){
        const token = req.header('Bearer-Auth-Token');
        if(!token)
        throw new UnauthorizedException('Token missing')

        const decoded:any = this.jwtService.decode(token);
        if(!decoded)
        throw new UnauthorizedException('Invalid Token');

        if(decoded.userType != UserType.admin)
        throw new UnauthorizedException('Access denied, for '+decoded.userType+' user');

        next();
    }
}
