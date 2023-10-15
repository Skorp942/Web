import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(student)
    private readonly studentRepository: Repository<student>,
  ) {}

  async findAll(): Promise<student[]> {
    return await this.studentRepository.find();
  }
}