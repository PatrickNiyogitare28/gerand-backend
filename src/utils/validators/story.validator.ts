import { IsString, IsNotEmpty, Length, IsDate, IsEnum, IsUrl, IsArray, IsEmpty, IsDateString } from 'class-validator';
import { storyType } from './../enums/storyType';

export class StoryValidator{
  @IsString()
  @IsNotEmpty()
  @Length(20,32)
  projectId: string

  @IsString()
  @IsNotEmpty()
  storyName:string
  
  @IsString()
  @IsNotEmpty()
  @Length(20,32)
  labelId: string

  @IsString()
  @IsNotEmpty()
  @Length(20,32)
  listId: string

  @IsString()
  @IsNotEmpty()
  @Length(20,32)
  owner: string


  @IsDateString()
  dueDate: Date

  @IsEnum(storyType)
  @IsNotEmpty()
  storyType: storyType

  @IsUrl()
  pullRequestURL: string | null

  @IsArray()
  tasks: []

  @IsArray()
  blocker: []

  @IsString()
  description:string
}