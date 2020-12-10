import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Project } from './project.model';
import {AuthService} from '../auth/auth.service';
import {User} from '../users/user.model';
import {UserType} from '../utils/enums/userType';
import { update } from 'lodash';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel('Project') private readonly ProjectModel: Model<Project>,
        @InjectModel('User') private readonly usersModel: Model<User>,
        private readonly authService: AuthService
    ){}

    async createProject(projectData, req){
        const currentUser:any = await this.authService.decodeToken(req);
        const owner = currentUser._id;
        const {projectName,projectType, users} = projectData;
        
        if(users.length > 0)
        for(let i = 0; i<users.length;i ++){
            await this.findUserById(users[i]);
         }
       
        for(let i = 0; i < users.length; i++){
            await this.findDuplicates(users, users[i]);
        } 
        users.push(owner);
        const project = await new this.ProjectModel({projectName,owner,projectType,users});
        const result = await project.save();
       
        return {
            success: true,
            result
        }
    }

    async getUserProjects(req: any){
        const currentUser:any = await this.authService.decodeToken(req);
        const usersProjects = await this.ProjectModel.find({users: currentUser._id});
        return usersProjects;
       }

    async getProjectById(projectId:string,req: any){
       const currentUser: any = await this.authService.decodeToken(req);
       let project;
       try{
           if(currentUser.userType != UserType.admin)
            project =  await this.ProjectModel.findOne({_id: projectId, users: currentUser._id});
            if(!project)
            return  new NotFoundException("Project with Id "+projectId+" not found");
           
           else
            return  await this.ProjectModel.findOne({_id: projectId});
       }
       catch(e){
           throw new NotFoundException("Project with Id "+projectId+" not found");
       }
    }
     
   async updateProject(projectId: string,data:any, req:any){
       const currentUser:any = await this.authService.decodeToken(req);
       const owner = currentUser._id;
       let updatedProject;
       try{
        updatedProject =  await this.ProjectModel.findById(projectId);
        if(!updatedProject)
        throw new NotFoundException("Project not found");
       }
       catch(e){
           throw new NotFoundException("Project not found");
       }
       const isProjectOwner = await this.ProjectModel.findOne({owner: currentUser._id});
       if(!isProjectOwner && !currentUser.UserType.admin)
       throw new UnauthorizedException('No access to update the project');

       const {projectName,projectType,users} = data;
       
       if(users && users.length > 0)
       {
        for(let i = 0; i < users.length; i++){
            await this.findDuplicates(users, users[i]);
           } 
          users.push(owner);
       }
      

       if(projectName)
       updatedProject.projectName = projectName;
       
       if(projectType)
       updatedProject.projectType = projectType;

       if(users)
       updatedProject.users = users;

       return await updatedProject.save();

   }

   async deleteProject(projectId: string, req: any){
     const currentUser:any = await this.authService.decodeToken(req);
     let deletableProject;
     try{
        deletableProject = await this.ProjectModel.findOne({_id: projectId});
        if(!deletableProject)
        throw new NotFoundException('Project not found//');
     }
     catch(e){
         console.log(e);
         throw new NotFoundException("Project not found.....");
     }
     
     if(deletableProject.owner != currentUser._id && currentUser.userType != UserType.admin)
     throw new UnauthorizedException("Delete access denied");

     await this.ProjectModel.findOneAndDelete({_id: projectId});
     return {
         success: true,
         message: "Project deleted"
     }

   }

    async findUserById(id: string){
        try{
            const user =await this.usersModel.findOne({_id: id, accountStatus: 1});   
            return {
                found: true,
                user
            }
        }
        catch(e){
            throw new NotFoundException("User with Id "+id+" not found")
        }
    }

    async findDuplicates(users:[], userId){
     let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
     let duplicates = [...new Set(findDuplicates(users))];

    if(duplicates.length > 0)
    throw new NotAcceptableException("Duplicate value in users not accepted");
    
    }

  
}
