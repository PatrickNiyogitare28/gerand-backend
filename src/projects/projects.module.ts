import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './../middlewares/auth.middlware';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import {ProjectSchema} from './project.model';
import configuration from '../config/configuration';
import {UserSchema} from '../users/user.model';
import{AuthService} from '../auth/auth.service';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name:'Project', schema: ProjectSchema}]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [ProjectsService, AuthService],
  controllers: [ProjectsController]
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
    .forRoutes({path: 'v1/api/projects/newProject', method: RequestMethod.POST});
  }
}
