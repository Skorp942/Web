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

  @UseGuards(AuthGuard)
  @Post()
  async createUniversity(@Body() createUniversityDto: UpdateUniversityDto) {
    const newUniversity = await this.institutionsService.createUniversity(createUniversityDto);
    return newUniversity;
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
}