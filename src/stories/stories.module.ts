import { MongooseModule } from '@nestjs/mongoose';
import { StoriesController } from './stories.controller';
import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StorySchema } from './stories.modal';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Story', schema: StorySchema}])
  ],
  providers: [StoriesService],
  controllers: [StoriesController]
})
export class StoriesModule {}
