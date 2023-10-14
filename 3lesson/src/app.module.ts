import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: "1111",
      database: "Students",
      entities: [Student], // Add other entities if needed
      synchronize: true,
    }),
  ],
})
export class AppModule {}