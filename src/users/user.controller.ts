import {Controller,Get,Post, Body, UsePipes, ValidationPipe, HttpCode} from '@nestjs/common';
import {ValidateUserData} from '../utils/validators/user.validator';
import {UserService} from './user.service';
import {AuthService} from '../auth/auth.service';

@Controller('v1/api/users')
export class UsersController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService){}

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

    @Get()
    getUsers(){
        return 'Getting users';
    }

    
}