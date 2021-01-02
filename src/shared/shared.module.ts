import { verifyAccountSchema } from './../users/verifyAccount.model';
import { labelSchema } from './../labels/labelmodel';
import { StorySchema } from './../stories/stories.modal';
import { ListSchema } from './../lists/list.model';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {JwtModule } from '@nestjs/jwt';
import { Module} from '@nestjs/common';
import configuration from '../config/configuration';
import {UserSchema} from '../users/user.model';
import {ProjectSchema} from '../projects/project.model';
import { SprintSchema } from './../sprints/sprints.modal';


@Module({
 imports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name:'Project', schema: ProjectSchema},
      {name: 'Story', schema: StorySchema},
      {name: 'List', schema: ListSchema},
      {name: 'Label', schema: labelSchema},
      {name: 'VerifyAccount', schema: verifyAccountSchema},
      {name: 'Sprint', schema: SprintSchema}
  ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
 ],
 exports: [
    ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name:'Project', schema: ProjectSchema}]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
 ]
})
export class SharedModule {}
