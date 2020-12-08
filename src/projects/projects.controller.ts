import { Controller, Post, Body, Req, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
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

 @Get('userProjects')
 getUserProjects(@Req() req: any){
    return this.projectService.getUserProjects(req);
 }

 @Get('getProjectById/:projectId')
 getProjectById(@Req() req: any, @Param('projectId') projectId: any){
    return this.projectService.getProjectById(projectId, req);
 }

 @Put('updateProject/:projectId')
 upateProject(@Param('projectId') projectId: string,@Req() req: any, @Body() data: any){
   return this.projectService.updateProject(projectId,data, req);
 } 
}
