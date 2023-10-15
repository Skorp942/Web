import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { student } from './student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([student])],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}