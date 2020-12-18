import { ListsService } from './lists.service';
import { Controller, Post, Body, Req, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
