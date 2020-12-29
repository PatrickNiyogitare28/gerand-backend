import { UserType } from './../utils/enums/userType';
import { User } from './../users/user.model';
import { Label } from './../labels/labelmodel';
import { List } from './../lists/list.model';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Injectable, NotFoundException, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from './../projects/projects.service';
import { AuthService } from './../auth/auth.service';
import { UserService } from './../users/user.service';
import { ListsService } from './../lists/lists.service';
import { LabelsService } from './../labels/labels.service';
import { Story } from './stories.modal';
import { Project } from './../projects/project.model';
import { callbackify } from 'util';
import { exists } from 'fs';

const {generateDisplayedId} = require('../utils/randoms/storyIdGenerator');

@Injectable()
export class StoriesService {
    constructor(
       @InjectModel('Story') private readonly StoryModel: Model<Story>,
       private readonly projectService: ProjectsService,
       private readonly authService: AuthService,
       private readonly userServce: UserService,
       private readonly listsService: ListsService,
       private readonly labelService: LabelsService
    ){}

    async createProject(data: any, req: any){
        const {projectId,storyName,labelId,listId,owner,storyType,pullRequestURL,tasks,blockers,description} = data;
        const currentUser:any = await this.authService.decodeToken(req);
        const requester = currentUser._id;

        const storyOwner = await this.userServce.findUserById(owner);
        const list = await this.listsService.getListById(listId);
        const label = await this.labelService.getLabelById(labelId);

        const projectExist: any = await this.projectService.findProjectById(projectId);
        if(projectExist.exist == false)
        throw new NotFoundException("Project not found");
         
        const isRequesterProjectMember = projectExist.project.users.findIndex(id => id == requester);
        if(isRequesterProjectMember == -1)
        throw new NotAcceptableException("Requester is not a project member");

        const isOwnerProjectMember = projectExist.project.users.findIndex(id => id == owner);
        if(isOwnerProjectMember == -1)
        throw new NotAcceptableException("Owner is not a project member");

        const displayedId = await generateDisplayedId();

       const newStory = await new this.StoryModel({displayedId,projectId,storyName,labelId,listId,requester,owner,storyType,pullRequestURL,tasks,blockers,description});
       await newStory.save();
       
       return {
           success: true,
           message: 'Story created successfully',
           _id: newStory._id,
           displayedId: newStory.displayedId,
           project: projectExist,
           requester: currentUser,
           storyType,
           label,
           storyOwner,
           list,
           createdDate: newStory.createdDate,
           dueDate: newStory.dueDate,
           description,
           pullRequestURL,
           tasks,
           blockers,
        }
    }

    async getStoryById(storyId: string){
        const story: Story = await this.findStoryById(storyId);
        const { 
            _id,displayedId,projectId,storyName,labelId,
            listId,owner,requester,createdDate,dueDate,
            storyType,pullRequestURL,tasks,blockers,description
             } = story;

        const {exist,project} = await this.projectService.findProjectById(projectId);     
        const list: List = await this.listsService.getListById(listId);    
        const label: Label = await this.labelService.getLabelById(labelId); 
        const storyRequester: User = await this.userServce.findUserById(requester);
        return {
            success: true,
            _id,
            storyName,
            displayedId,
            project,
            storyRequester,
            storyType,
            label,
            owner,
            list,
            createdDate,
            dueDate,
            description,
            pullRequestURL,
            tasks,
            blockers,
        }
    }

    async getStoriesByProjectId(projectId: string){
        const {exist, project} = await this.projectService.findProjectById(projectId);
        if(exist == false)
        throw new NotFoundException("Project not found");
        
        return await this.StoryModel.find({projectId: projectId});
     }

  async updateStory(storyId: string,data: any){
    const {projectId,storyName,labelId,listId,owner,storyType,pullRequestURL,tasks,blockers,description} = data;
    const updatableStory = await this.findStoryById(storyId);
    
    let projectExist,project,label,list,storyOwner;
    if(projectId)
        projectExist = await this.projectService.findProjectById(projectId);
        if(projectExist.exist == false)
        throw new NotFoundException("Project not found");
        project = projectExist.project;
        updatableStory['projectId']=projectId;
        

    if(labelId)
        label = await this.labelService.findLabelById(labelId);
        updatableStory['labelId']=labelId;

    if(listId)
         list = await this.listsService.getListById(listId);    
         updatableStory['listId']=listId;
   
    if(storyName)
         updatableStory['storyName']=storyName;
         
    if(owner)
         storyOwner = await this.userServce.findUserById(owner);
         updatableStory['owner']=owner; 
    
    if(storyType)
         updatableStory['storyType']=storyType;
    
    if(pullRequestURL)
         updatableStory['pullRequestURL']=pullRequestURL;

    if(tasks)
       updatableStory['pullRequestURL']=pullRequestURL;
         
    if(blockers)
        updatableStory['blockers']=blockers;

          
   if(description)
      updatableStory['description']=description;    
      
    const newStoryData = await updatableStory.save();    
    return newStoryData;     
  }

  async deleteStory(storyId: string, req:any){
      const currentUser:any = await this.authService.decodeToken(req);
      let story: Story = await this.findStoryById(storyId);

      const {_id,projectId} = story;

      const {project} = await this.projectService.findProjectById(projectId);
      const isProjectMember = project.users.indexOf(currentUser._id);
      if(currentUser.userType != UserType.admin && isProjectMember)
        throw new UnauthorizedException("Access denied for not project members");

      await this.StoryModel.findByIdAndDelete(_id);
      return {
          success:'true',
          message:'Story deleted',
          story
      }
      
  } 

    async findStoryById(storyId: string){
        console.log(storyId)
        try{
            const story = await this.StoryModel.findById(storyId);
            if(!story)
            throw new NotFoundException("Story not found");

            return story;
        }
        catch(e){
            throw new NotFoundException("Story not found");
        }

    }

    
}
