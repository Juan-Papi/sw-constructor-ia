import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

import { User } from './entities/user.entity';
import { GetUser, Auth } from './decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User was created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
