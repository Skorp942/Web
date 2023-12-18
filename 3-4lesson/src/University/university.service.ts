import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { University } from './university.entity';
import { UpdateUniversityDto } from './dto/update-university.dto'; 

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async findAll(): Promise<University[]> {
    return await this.universityRepository.find();
  }

  async updateUniversity(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University | null> {
    const options: FindOneOptions<University> = {
      where: { university_id: id },
    };
    const university = await this.universityRepository.findOne(options); 
    if (!university) {
      return null; 
    }

    Object.assign(university, updateUniversityDto);
    return await this.universityRepository.save(university);
  }

  async createUniversity(createUniversityDto: UpdateUniversityDto): Promise<University> {
    const newUniversity = this.universityRepository.create(createUniversityDto);
    return await this.universityRepository.save(newUniversity);
  }

  async deleteUniversity(id: number): Promise<void> {
    const result = await this.universityRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Университет не найден');
    }
  }

  async findUniversityById(id: number): Promise<University | undefined> {
    const university = await this.universityRepository.findOne({ where: { university_id: id } });
  
    if (!university) {
      throw new NotFoundException('Университет не найден');
    }
  
    return university;
  }
}