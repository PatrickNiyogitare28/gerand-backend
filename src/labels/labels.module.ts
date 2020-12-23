import { SharedModule } from './../shared/shared.module';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { ProjectSchema } from './../projects/project.model';
import { UserSchema } from './../users/user.model';
import { ProjectsModule } from './../projects/projects.module';
import { ProjectsService } from './../projects/projects.service';

import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import {labelSchema} from './labelmodel';
import { AuthMiddleware } from './../middlewares/auth.middlware';
import configuration from '../config/configuration';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{name: 'Label', schema: labelSchema}])
  ],
  providers: [LabelsService,ProjectsService, AuthService],
  controllers: [LabelsController]
})
export class LabelsModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
     consumer.apply(AuthMiddleware).forRoutes(LabelsController);
  }
}
