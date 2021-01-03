import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MailingService } from './../mailing/mailing.service';
import { SharedModule } from './../shared/shared.module';
import { LabelsService } from './../labels/labels.service';
import { ListsService } from './../lists/lists.service';
import { UserService } from './../users/user.service';
import { AuthService } from './../auth/auth.service';
import { ProjectsService } from './../projects/projects.service';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { SprintsService } from './../sprints/sprints.service';
import { AuthMiddleware } from './../middlewares/auth.middlware';


@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    StoriesService,
     ProjectsService, 
     AuthService,
     UserService,
     ListsService,
     LabelsService,
     MailingService,
     SprintsService
    ],
  controllers: [StoriesController]
})
export class StoriesModule implements NestModule{
   configure(consumer: MiddlewareConsumer){
     consumer.apply(AuthMiddleware).forRoutes(StoriesController);
   }
}
