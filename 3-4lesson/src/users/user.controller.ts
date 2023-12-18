import { Controller, Get, UseGuards, Request, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentUser(@Request() req) {
    const userId = req.user.Id;
    const user = await this.usersService.findById(userId);
    return user;
  }


  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUsers(@Param('id') id: number, @Body() сreateUserDto: CreateUserDto) {
    const updateUsers = await this.usersService.updateUsers(id, сreateUserDto);
    return updateUsers;
  }


  @UseGuards(AuthGuard)
  @Post()
  async createUsers(@Body() сreateUserDto: CreateUserDto) {
    const newUsers = await this.usersService.createUsers(сreateUserDto);
    return newUsers;
  }
  

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUsers(@Param('id') id: number) {
    await this.usersService.deleteUsers(id);
    return { message: 'Пользователь успешно удален' };
  }

}