import { SharedModule } from './../shared/shared.module';
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
   SharedModule
  ],
  providers: [ProjectsService, AuthService],
  controllers: [ProjectsController]
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(ProjectsController)
  }
}
