import { Controller, Post, Body, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectValidator} from '../utils/validators/project.validator';

@Controller('v1/api/projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService ){} 

 @Post('newProject')
 @UsePipes(new ValidationPipe({transform: true}))
 createProject(@Body() data: ProjectValidator, @Req() req: any){
    return this.projectService.createProject(data,req);
 }
}
