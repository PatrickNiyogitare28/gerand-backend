import { ConfigModule } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import {Module} from '@nestjs/common';
import {UsersController} from './user.controller';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../users/user.model';
import configuration from '../config/configuration';
@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
          })
        
    ],
    controllers: [UsersController],
    providers: [UserService, AuthService]
    
})

export class UserModule {
    
}
