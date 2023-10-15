import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column()
  admission_year: number;
}