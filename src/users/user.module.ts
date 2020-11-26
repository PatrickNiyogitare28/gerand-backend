import {Module} from '@nestjs/common';
import {UsersController} from './user.controller';
import {UserService} from './user.service';
import {ConfigModule} from 'nestjs-dotenv';

@Module({
    imports: [ConfigModule.forRoot(`src/config/${process.env.NODE_ENV}.env`)],
    controllers: [UsersController],
    providers: [UserService]
    
})

export class UserModule {
    
}
