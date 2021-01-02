import { Controller, Post, Body, Req } from '@nestjs/common';
import { SprintsService } from './sprints.service';


@Controller('v1/api/sprints')
export class SprintsController {
    constructor(private readonly sprintService: SprintsService){}

    @Post('newSprint')
    addSprint(@Body() data: any, @Req() req: any){
        return this.sprintService.createSprint(data,req);
    }
}
