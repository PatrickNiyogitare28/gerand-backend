import { SharedModule } from './../shared/shared.module';
import { IsAdminMiddleware } from './../middlewares/isAdmin.middleware';
import { AuthMiddleware } from './../middlewares/auth.middlware';
import { ListSchema } from './list.model';
import { ProjectsService } from './../projects/projects.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ProjectSchema } from './../projects/project.model';
import { UserSchema } from './../users/user.model';
import configuration from '../config/configuration';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{name: 'List', schema: ListSchema}
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [ListsService, AuthService, ProjectsService],
  controllers: [ListsController]
})

export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(IsAdminMiddleware).forRoutes({path: 'v1/api/lists', method: RequestMethod.GET}),
    consumer.apply(AuthMiddleware).forRoutes(ListsController)
  }
}
