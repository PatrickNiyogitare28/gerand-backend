import {Module} from '@nestjs/common';
import {UsersController} from './user.controller';
import {UserService} from './user.service';
import {ConfigModule} from 'nestjs-dotenv';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../users/user.model';

@Module({
    imports: [
        ConfigModule.forRoot(`src/config/${process.env.NODE_ENV}.env`),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [UsersController],
    providers: [UserService]
    
})

export class UserModule {
    
}
