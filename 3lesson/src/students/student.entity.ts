import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column()
  birthdate: Date;

  @Column()
  group_name: string;

  @Column()
  admission_year: number;
}