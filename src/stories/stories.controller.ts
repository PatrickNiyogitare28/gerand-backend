import { Controller, Post, Body, Req } from '@nestjs/common';
import {StoriesService} from './stories.service';

@Controller('v1/api/stories')
export class StoriesController {
    constructor(
        private readonly storiesService: StoriesService
    ){ }
    
    @Post('createStory')
    createStory(@Body() data: any, @Req() req: any){
      return this.storiesService.createProject(data, req);
    }
}
