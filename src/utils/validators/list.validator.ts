import { IsString, Length, IsNotEmpty } from 'class-validator';

export class ListValidator{
    @IsString()
    @Length(2,32)
    @IsNotEmpty()
    listName: string

    @IsString()  
    @Length(20,32)
    @IsNotEmpty()
    projectId: string
}

export class UpdateListNameValidator{
    @IsString()
    @Length(2,32)
    @IsNotEmpty()
    listName: string
}