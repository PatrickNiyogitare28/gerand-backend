import { StoriesController } from './stories.controller';
import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';

@Module({
  providers: [StoriesService],
  controllers: [StoriesController]
})
export class StoriesModule {}
