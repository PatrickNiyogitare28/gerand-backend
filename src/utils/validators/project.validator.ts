import { IsString, IsNotEmpty, IsArray, Length, IsEnum} from 'class-validator';
import {ProjectType} from '../../utils/enums/projectTypes';
export class ProjectValidator {
   
    @IsString()
    @Length(2,30)
    @IsNotEmpty()
    projectName: string;

    @IsEnum(ProjectType)
    projectType: string;

    @IsArray()
    users: [];
}