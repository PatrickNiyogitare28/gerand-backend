import { AuthMiddleware } from './../middlewares/auth.middlware';
import { verifyAccountSchema } from './../users/verifyAccount.model';
import { labelSchema } from './../labels/labelmodel';
import { LabelsModule } from './../labels/labels.module';
import { ListSchema } from './../lists/list.model';
import { MailingService } from './../mailing/mailing.service';
import { SharedModule } from './../shared/shared.module';
import { UserSchema } from './../users/user.model';
import { LabelsService } from './../labels/labels.service';
import { ListsService } from './../lists/lists.service';
import { UserService } from './../users/user.service';
import { AuthService } from './../auth/auth.service';
import { ProjectsService } from './../projects/projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesController } from './stories.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StorySchema } from './stories.modal';
import { ProjectSchema } from './../projects/project.model';


@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {name: 'Story', schema: StorySchema},
      {name:'Project', schema: ProjectSchema},
      {name: 'User', schema: UserSchema}, 
      {name: 'List', schema: ListSchema},
      {name: 'Label', schema: labelSchema},
      {name: 'VerifyAccount', schema: verifyAccountSchema},
      

    ])
  ],
  providers: [StoriesService, ProjectsService, AuthService,UserService,ListsService,LabelsService, MailingService],
  controllers: [StoriesController]
})
export class StoriesModule implements NestModule{
   configure(consumer: MiddlewareConsumer){
     consumer.apply(AuthMiddleware).forRoutes(StoriesController);
   }
}
