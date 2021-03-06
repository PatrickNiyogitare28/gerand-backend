import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Label} from './labelmodel';
import {ProjectsService} from '../projects/projects.service';

@Injectable()
export class LabelsService {
    constructor(
     @InjectModel('Label') private readonly LabelModel: Model<Label>,
     private readonly projectService: ProjectsService,
     private readonly authService: AuthService
    ){
       
    }
   async createLabel(data:any, req:any){
      const currentUser:any = await this.authService.decodeToken(req);
      const createdBy = currentUser._id;
      const {projectId, labelName} = data;
      const project = await this.findProject(projectId);
      
      const isProjectMember = project.users.findIndex(id => id == currentUser._id);
      if(isProjectMember == -1)
      throw new NotAcceptableException('User should be a project member');
      
      const labelExist = await this.findLabelName(labelName);
      if(labelExist == true)
      throw new NotAcceptableException('label name already used');
      
      const newLabel = await new this.LabelModel({labelName,projectId,createdBy});
      const result = await newLabel.save();
      
      return {
        success: true,
        result
      }
    }

    async getLabels(){
      return this.LabelModel.find();
    }

    async getProjectLabels(projectId: string){
       const projectExist = await this.findProject(projectId);
       if(projectExist)
       return this.LabelModel.find({projectId: projectId});
    }

    async getLabelById(labelId:string){
      return this.findLabelById(labelId);
    }
   

    async updateLabel(labelId: string,data:any){
       let label = await this.findLabelById(labelId);
       const {labelName} = data;
       label.labelName = labelName;
       label.save();
       return label;
    }

    async deleteLabel(labelId: string, req: any){
      const label = await this.findLabelById(labelId);
      const projectPayload = await this.findProject(label.projectId);
      const currentUser:any = await this.authService.decodeToken(req);
      
      const isProjectUser = projectPayload.users.findIndex(userId => userId == currentUser._id);
      if(isProjectUser == -1)
      return new UnauthorizedException('You have no access');

      await this.LabelModel.findOneAndDelete({_id: labelId});
      return {
        success: true,
        message: 'label removed successfully'
      }
    }


    async findProject(projectId:string){
      let projectPayloads = await this.projectService.findProjectById(projectId);
       const {exist, project} = projectPayloads;
       if(exist == false)
       throw new NotFoundException("Project not found");

       return project;
    }


    async findLabelName(labelName){
      try{
        let exist = await this.LabelModel.findOne({labelName: labelName});
        if(exist)
        return true;

        return false;
      }
      catch(e){
        return false;
      }
    }

    async findLabelById(id:string){
      let label;
      try{
        label = await this.LabelModel.findById(id);
        if(!label)
        throw new NotFoundException('Label not found');

        return label;
      }
      catch(e){
          throw new NotFoundException('Label not found');
      }
    }
    
}
