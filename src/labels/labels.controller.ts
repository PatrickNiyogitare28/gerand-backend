import { Controller, Post, Body, Req, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import {LabelsService} from './labels.service';
import {LabelValidator, updatedLabelValidator} from '../utils/validators/label.validator';

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
    @Get('labelsByProject/projectId/:projectId')
    getLabelsByProject(@Param('projectId') projectId: string){
       return this.labelsService.getProjectLabels(projectId);
    }
    
    @Get('labelById/labelId/:labelId')
    getLabelById(@Param('labelId') labelId: string){
      return this.labelsService.getLabelById(labelId);
    }

    @Put('updateLabel/labelId/:labelId')
    @UsePipes(new ValidationPipe({transform: true}))
    updateLabel(@Param('labelId') labelId: string, @Body() data: updatedLabelValidator){
        return this.labelsService.updateLabel(labelId, data);
    }
}
