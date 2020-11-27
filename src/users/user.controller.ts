import {Controller,Get,Post, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import {ValidateUserData} from '../utils/validators/user.validator';
import {UserService} from './user.service';

@Controller('v1/api/users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Post('/createUser')
    @UsePipes(new ValidationPipe({transform: true}))
    createUser(
        @Body() data: ValidateUserData
    ){
        return this.userService.createUser(data);
    }


    @Get()
    getUsers(){
        return 'Getting users';
    }

    
}