import { Controller, Post, Body, UnauthorizedException, HttpStatus, HttpCode,  UseGuards, Get, Request,} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const { username, password } = loginData;

    const user = await this.usersService.authenticate(username, password);

    if (!user) {
      throw new UnauthorizedException('Неверные данные');
    }

    return user;
  }

  @Post('register')
  async register(@Body() { username, password }: { username: string; password: string }) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('Пользователь с таким именем уже существует');
    }
    const user = await this.usersService.create(username, password);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

