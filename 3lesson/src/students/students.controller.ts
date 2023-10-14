import { Controller, Get } from '@nestjs/common';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('students')
export class StudentsController {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
}