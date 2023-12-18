import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async authenticate(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.Id, username: user.username };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { Id: userId } });
  }

  async updateUsers(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { Id: id } });
    if (!user) {
        throw new NotFoundException('Пользователь не найден');
    }

    user.username = updateUserDto.username;

    if (updateUserDto.password) {
        user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return await this.usersRepository.save(user);
}

  async createUsers(createStudentDto: CreateUserDto): Promise<User> {
    const newUsers = this.usersRepository.create(createStudentDto);
    return await this.usersRepository.save(newUsers);
  }

  async deleteUsers(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Пользователь не найдена');
    }
  }
}