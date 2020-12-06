import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Project } from './project.model';
import {AuthService} from '../auth/auth.service';
import {User} from '../users/user.model';

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

   async getUserProjects(req: any){
    const currentUser:any = await this.authService.decodeToken(req);
    const usersProjects = await this.ProjectModel.find({users: currentUser._id});
    return usersProjects;
   }
}
