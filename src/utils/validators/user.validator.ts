import {IsEmail, IsInt, IsNumber, IsNotEmpty, Length, IsString,IsEnum } from 'class-validator';
import {AccountType} from '../enums/accountType';
import {UserType} from '../enums/userType';

export class ValidateUserData {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    firstname: string;

 
    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,62)
    password: string;

    @IsEnum(AccountType)
    accountType: AccountType;

    @IsEnum(UserType)
    @IsNotEmpty()
    userType: UserType;
    
}