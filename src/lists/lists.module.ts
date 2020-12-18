import { AuthMiddleware } from './../middlewares/auth.middlware';
import { ListSchema } from './list.model';
import { ProjectsService } from './../projects/projects.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ProjectSchema } from './../projects/project.model';
import { UserSchema } from './../users/user.model';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name:'Project', schema: ProjectSchema},
      {name: 'List', schema: ListSchema}
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
    consumer.apply(AuthMiddleware).forRoutes(ListsController)
  }
}
