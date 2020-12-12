import { IsString, Length, IsNotEmpty } from 'class-validator';
export class LabelValidator {
    @IsString()
    @Length(2, 100)
    @IsNotEmpty()
    labelName: string;

    @IsString()
    @Length(20,32)
    @IsNotEmpty()
    projectId: string;
}