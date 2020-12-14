import { Controller, Post, Body, Req, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import {LabelsService} from './labels.service';
import {LabelValidator} from '../utils/validators/label.validator';

@Controller('v1/api/labels')
export class LabelsController {
    constructor(private readonly labelsService: LabelsService){}
   
    @Post('createLabel')
    @UsePipes(new ValidationPipe({transform: true}))
    addLabel(@Body() data: LabelValidator, @Req() req: any){
       return this.labelsService.createLabel(data, req);
    }

    @Get('')
    getProjects(){
        return this.labelsService.getLabels();
    }
}
