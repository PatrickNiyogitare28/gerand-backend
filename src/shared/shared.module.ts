import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {JwtModule } from '@nestjs/jwt';
import { Module} from '@nestjs/common';
import configuration from '../config/configuration';
import {UserSchema} from '../users/user.model';
import {ProjectSchema} from '../projects/project.model';

@Module({
 imports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name:'Project', schema: ProjectSchema}
  ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
 ],
 exports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name:'Project', schema: ProjectSchema}]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
 ]
})
export class SharedModule {}