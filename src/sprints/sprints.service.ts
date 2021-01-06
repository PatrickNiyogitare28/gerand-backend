import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import {Model} from 'mongoose';
import {AuthService} from '../auth/auth.service';
import { ProjectsService } from './../projects/projects.service';
import {Sprint} from './sprints.modal';
import {Project} from '../projects/project.model';
import {sprintStatus} from '../utils/enums/sprintStatus';
import { isFunction } from 'lodash';


@Injectable()
export class SprintsService {
    constructor(
        @InjectModel('Sprint') readonly SprintModal: Model<Sprint>, 
        private readonly authService: AuthService,
        private readonly projectService: ProjectsService
    ){}

    async createSprint(data: any, req: any){
          const {projectId,sprintName, endDate, status} = data;
          const currentUser:any = await this.authService.decodeToken(req);
          const {exist, project} = await this.projectService.findProjectById(data.projectId);
          if(exist == false)
           return new NotFoundException("Project not found");

          const isProjectMember = project.users.indexOf(currentUser._id);
          if(isProjectMember == -1)
          return new NotAcceptableException("Access denied for non project members");
          
          const query = {
              status: sprintStatus.active,
              projectId
          }
          
          const activeSprints:any = [] = await this.SprintModal.find(query);
          activeSprints.forEach(async sprint => {
              await this.SprintModal.findOneAndUpdate({_id: sprint._id}, {status: sprintStatus.ended});
          });

          const sprint = await new this.SprintModal({sprintName, projectId, endDate, status, createdBy: currentUser._id});
                sprint.save();
          return {
              success: true,
              message: 'Sprint created',
              sprint
          }
     }

    async findSprintById(sprintId: string){
        let sprint:Sprint;
        try{
            sprint = await this.SprintModal.findById(sprintId);
            if(!sprint)
            throw new NotFoundException('Srint not found');
        }
         catch(e){
            throw new NotFoundException("Sprint not found");
        }
       const {project} = await this.projectService.findProjectById(sprint.projectId);
       return {
           sprint,
           project
       }
       
    }

    async getSprintsByProject(projectId: string){
        const {exist, project} = await this.projectService.findProjectById(projectId);
        if(exist == false)
        return new NotFoundException("Project not found");

        const sprints:[] = await this.SprintModal.find({projectId});
        return sprints;
    }

    async udpateSprint(sprintId: string,data:any){
        const updatableSprint = await this.findSprintById(sprintId);
        const sprint:any = updatableSprint.sprint;
        const {sprintName, status, startDate,endDate} = data;
        
        if(sprintName)
        sprint.sprintName = sprintName;

        if(status)
        sprint.status = status;

        if(startDate)
        sprint.startDate = startDate;

        if(endDate)
        sprint.endDate = endDate;

        await sprint.save();
        return sprint
       
    }
    
}
