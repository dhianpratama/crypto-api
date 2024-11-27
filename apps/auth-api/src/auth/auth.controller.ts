import { Body, Controller, forwardRef, HttpCode, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from '@nimo/dto'

@Controller('auth')
export class AuthController {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(200)
	async adminLogin(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
		console.log("LOGIN DTO ", loginDto)
		return this.authService.login(loginDto)
	}
}
