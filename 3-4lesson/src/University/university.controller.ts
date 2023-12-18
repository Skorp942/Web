import { Controller, Get, Post, Put, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { UniversityService } from './university.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Controller('University') 
export class UniversityController {
  constructor(private readonly institutionsService: UniversityService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const universities = await this.institutionsService.findAll(); 
    return universities;
  }

  async createUniversity(@Body() createUniversityDto: UpdateUniversityDto) {
    try {
      const newUniversity = await this.institutionsService.createUniversity(createUniversityDto);
      return newUniversity;
    } catch (error) {
      console.error('Ошибка при создании университета', error);
      throw error; // Пробросьте ошибку, чтобы увидеть ее в клиентском коде
    }
  }


  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUniversity(@Param('id') id: number, @Body() updateUniversityDto: UpdateUniversityDto) {
    const updatedUniversity = await this.institutionsService.updateUniversity(id, updateUniversityDto); // Изменили название функции
    return updatedUniversity;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUniversity(@Param('id') id: number) {
    await this.institutionsService.deleteUniversity(id); 
    return { message: 'Университет успешно удален' };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findUniversityById(@Param('id') id: number) {
    const university = await this.institutionsService.findUniversityById(id);
    return university;
  }
}