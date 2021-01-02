import { MongooseModule } from '@nestjs/mongoose';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import {SharedModule} from '../shared/shared.module';
import {SprintSchema} from './sprints.modal';
import { LabelsService } from './../labels/labels.service';
import { ListsService } from './../lists/lists.service';
import { UserService } from './../users/user.service';
import { AuthService } from './../auth/auth.service';
import { ProjectsService } from './../projects/projects.service';
import { MailingService } from './../mailing/mailing.service';
import { AuthMiddleware } from './../middlewares/auth.middlware';

@Module({
  imports: [
    SharedModule,
  ],
  providers: [SprintsService, AuthService,LabelsService,ListsService,ProjectsService,UserService, MailingService],
  controllers: [SprintsController]
})
export class SprintsModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(SprintsController)
  }
}
