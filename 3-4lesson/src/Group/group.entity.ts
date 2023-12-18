import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { University } from '../university/university.entity';

@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  group_id: number;

  @Column({ length: 100 })
  group_name: string;

  @Column()
  university_id: number;
}