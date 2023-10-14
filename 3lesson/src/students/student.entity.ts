import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  first_name: string;
  // Другие поля студента, если необходимо
}