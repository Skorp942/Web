import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import { student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(): Promise<student[]> {
    return this.studentsService.findAll();
  }
}