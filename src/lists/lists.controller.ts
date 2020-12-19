import { ListsService } from './lists.service';
import { Controller, Post, Body, Req, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import {ListValidator} from '../utils/validators/list.validator';

@Controller('v1/api/lists')
export class ListsController {
    constructor(
      private readonly listsService: ListsService
    ){}

    @Post('createNewList')
    @UsePipes(new ValidationPipe({transform: true}))
    createList(@Body() data: ListValidator, @Req() req: any){
     return this.listsService.createList(data,req);
    }

    @Get('')
    getAllLists(){
     return this.listsService.getAllLists();
    }

    @Get('getListById/listId/:listId')
    getListById(@Param('listId') listId: string){
      return this.listsService.getListById(listId);
    }

    @Get('getListByProject/projectId/:projectId')
    getListByProject(@Param('projectId') projectId: string, @Req() req: any){
      return this.listsService.getListsByProject(projectId, req);
    }

    @Put('upateListName/listId/:listId')
    updateListName(@Param('listId') listId: string, @Body('listName') listName:string, @Req() req: any){
      return this.listsService.updateListName(listId,listName,req);
    }
}
