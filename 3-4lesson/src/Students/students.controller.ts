import { Controller, Get, UseGuards} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const students = await this.studentsService.findAll();
    return students;
  }
}