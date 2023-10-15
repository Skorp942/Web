import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groups } from './groups.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupsRepository: Repository<Groups>,
  ) {}

  async findAll(): Promise<Groups[]> {
    return this.groupsRepository.find();
  }
}

