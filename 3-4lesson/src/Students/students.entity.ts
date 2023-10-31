import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 100 })
  full_name: string;
}