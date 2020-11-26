import {Controller,Get,Post} from '@nestjs/common';

@Controller('v1/api/users')
export class UsersController {
    @Get()
    getUsers(){
        return 'Getting users';
    }
}