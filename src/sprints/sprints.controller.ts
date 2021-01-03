import { Controller, Post, Body, Req,UsePipes,ValidationPipe, Param, Get } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintValidator } from './../utils/validators/sprint.validator';


@Controller('v1/api/sprints')
export class SprintsController {
    constructor(private readonly sprintService: SprintsService){}

    @Post('newSprint')
    @UsePipes(new ValidationPipe({transform: true, skipMissingProperties: true}))
    addSprint(@Body() data: SprintValidator, @Req() req: any){
        return this.sprintService.createSprint(data,req);
    }

    @Get('getSprintById/:sprintId')
    getSprintById(@Param('sprintId') sprintId: any){
       return this.sprintService.findSprintById(sprintId)
    }
}
