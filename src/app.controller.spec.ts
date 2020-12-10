import { ProjectsModule } from './projects/projects.module';
import { MailingModule } from './mailing/mailing.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'nestjs-dotenv';
import { UserModule } from './users/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot(`src/config/${process.env.NODE_ENV}.env`),
        MongooseModule.forRoot('mongodb://localhost/gerend_db'),
        AuthModule,
        MailingModule,
        ProjectsModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return welcome message', () => {
      expect(appController.getHello()).not.toBeNull;
    });
  });
});
