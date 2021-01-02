import { sprintStatus } from './../enums/sprintStatus';
import { IsString, IsNotEmpty, Length, IsDate, IsEnum, IsUrl, IsArray, IsEmpty, IsDateString } from 'class-validator';

export class SprintValidator{
  @IsString()
  @IsNotEmpty()
  @Length(20,32)
  projectId: string

  @IsString()
  @IsNotEmpty()
  spirntName:string
  
  @IsDateString()
  endDate: Date

  @IsEnum(sprintStatus)
  @IsNotEmpty()
  status: sprintStatus
}