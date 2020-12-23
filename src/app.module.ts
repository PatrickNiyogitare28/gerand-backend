import { StoriesModule } from './stories/stories.module';
// import * as dotenv from 'dotenv';
import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-dotenv';
import { MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailingModule } from './mailing/mailing.module';
import { ProjectsModule } from './projects/projects.module';
import { LabelsModule } from './labels/labels.module';
import { ListsModule } from './lists/lists.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(`src/config/${process.env.NODE_ENV}.env`),
    MongooseModule.forRoot('mongodb://localhost/gerend_db'),
    AuthModule,
    MailingModule,
    ProjectsModule,
    LabelsModule,
    ListsModule,
    SharedModule,
    StoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
