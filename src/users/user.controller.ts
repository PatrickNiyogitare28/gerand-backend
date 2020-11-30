import {Controller,Get,Post, Body, UsePipes, ValidationPipe, HttpCode, Req, Param} from '@nestjs/common';
import {ValidateUserData} from '../utils/validators/user.validator';
import {UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {MailingService} from '../mailing/mailing.service';

@Controller('v1/api/users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly mailingService: MailingService
        ){}

    @Post('/createUser')
    @UsePipes(new ValidationPipe({transform: true}))
    createUser(
        @Body() data: ValidateUserData
    ){
        return this.userService.createUser(data);
    }
   
    @Post('/auth/login')
    @HttpCode(200)
    login(@Body() data: any){
        const {email, password} = data;
        return this.authService.login(email,password);
    }

    @Get('/auth/jwt')
    @HttpCode(200)
    decodeToken(@Req() req: any){
        return this.authService.decodeToken(req);
    }

    @Get()
    getUsers(){
        return 'Getting users';
    }

    @Get('/auth/verifyEmail/userId/:userId/code/:code')
    verifyEmail(@Param('userId') userId: string, @Param('code') code: number){
       return this.mailingService.verifyEmail(userId, code);
    }
}