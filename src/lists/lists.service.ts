import { Injectable, UnauthorizedException, NotAcceptableException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './../projects/projects.service';
import { AuthService } from './../auth/auth.service';
import { UserType} from '../utils/enums/userType';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {List} from './list.model';

@Injectable()
export class ListsService {
    constructor(
        @InjectModel('List') private readonly ListModel: Model<List>,
        private readonly authService: AuthService,
        private readonly projectService: ProjectsService
        ){}

  async createList(data: any, req: any){
    const {listName, projectId} = data;
    const currentUser: any = await this.authService.decodeToken(req);
    const createdBy = currentUser._id;

    const project:any = await this.projectService.getProjectById(projectId, req);
    const isMember = await project.users.findIndex(id => id == currentUser._id);
    if(isMember == -1 && currentUser.userType != UserType.admin)
    throw new UnauthorizedException("Un authorized to project");

    await this.findListByName(listName);
    const list = await new this.ListModel({listName, projectId,createdBy});
    await list.save();
    return {
        success: true,
        message: 'List created successfully',
        list
    }
  }

  async getListById(listId: string){
      try{
          let list = await this.ListModel.findById(listId)
          if(!list)
          throw new NotFoundException("List not found");
          
          return list;
      }
      catch(e){
       throw new NotFoundException("List not found");
      }
  }

  async findListByName(listName:string){
      let list;
      try{
          list = await this.ListModel.findOne({listName: listName});
          if(list)
          throw new NotAcceptableException("List name aready used");

          return true;
      }
      catch(e){
         throw new NotAcceptableException(e);
      }
  }
  
}
