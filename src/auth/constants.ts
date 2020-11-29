import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        JwtModule.register({
        secret: process.env.SECRET_KEY
    })]
})
export class JwtConstantModule {}

