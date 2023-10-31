import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where :{ username }});
  }

  async authenticate(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.Id, username: user.username };
    return {access_token: await this.jwtService.signAsync(payload),};
    }
    return null;
  }
}