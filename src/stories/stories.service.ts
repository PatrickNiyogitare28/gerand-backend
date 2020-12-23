import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { ProjectsService } from './../projects/projects.service';
import { AuthService } from './../auth/auth.service';
import { UserService } from './../users/user.service';
import { ListsService } from './../lists/lists.service';
import { LabelsService } from './../labels/labels.service';
import { Story } from './stories.modal';
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
        const {projectId,storyName,labelId,listId,owner,storyType,pullRequestURL,tasks,blocker,description} = data;
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

       const newStory = await new this.StoryModel({displayedId,projectId,storyName,labelId,listId,requester,owner,storyType,pullRequestURL,tasks,blocker,description});
       await newStory.save();
       
       return {
           success: true,
           message: 'Story created successfully',
           _id: newStory._id,
           displayedId: newStory.displayedId,
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
           blocker,

       }
    }
}
