import { Controller, Post, Body, Req, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import {StoriesService} from './stories.service';
import {StoryValidator} from '../utils/validators/story.validator';
@Controller('v1/api/stories')
export class StoriesController {
    constructor(
        private readonly storiesService: StoriesService
    ){ }
    
    @Post('createStory')
    @UsePipes(new ValidationPipe({transform: true, skipMissingProperties: true}))
    createStory(@Body() data: StoryValidator, @Req() req: any){
      return this.storiesService.createProject(data, req);
    }

    @Get('getStory/storyId/:storyId')
    getStoryById(@Param('storyId') storyId: string){
      return this.storiesService.getStoryById(storyId);
    }

    @Get('getStoreisByProject/projectId/:projectId')
      getStoriesByProject(@Param('projectId') projectId: string){
      return this.storiesService.getStoriesByProjectId(projectId);
    }
}
