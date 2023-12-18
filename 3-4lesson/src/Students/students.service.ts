import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Students } from './students.entity';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
  ) {}

  async findAll(): Promise<Students[]> {
    return await this.studentsRepository.find();
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Students | null> {
    const options: FindOneOptions<Students> = {
      where: { student_id: id },
    };
    const student = await this.studentsRepository.findOne(options);
    if (!student) {
      return undefined; 
    }

    Object.assign(student, updateStudentDto);
    return await this.studentsRepository.save(student);
  }

  async createStudent(createStudentDto: UpdateStudentDto): Promise<Students> {
    const newStudent = this.studentsRepository.create(createStudentDto);
    return await this.studentsRepository.save(newStudent);
  }

  async deleteStudent(id: number): Promise<void> {
    await this.studentsRepository.createQueryBuilder()
      .relation(Students, 'grades')
      .of(id)
      .delete();
  
    const result = await this.studentsRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException('Студент не найден');
    }
  }
}