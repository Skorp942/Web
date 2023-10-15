import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { student } from './students/student.entity';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: "1111",
      database: "Students",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([student]),
    StudentsModule,
  ],
})
export class AppModule {}
