import {IsString, IsNotEmpty, Length} from 'class-validator';

export class updatedLabelValidator{
    @IsString()
    @Length(2, 100)
    @IsNotEmpty()
    labelName: string
}