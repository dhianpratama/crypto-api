import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginRequestDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(48)
    @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
    email!: string;
  
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class LoginResponseDto {
	@IsString()
	accessToken!: string;

    static factory(accessToken: string): LoginResponseDto {
		const response = new LoginResponseDto();
		response.accessToken = accessToken;
		return response;
	}
}