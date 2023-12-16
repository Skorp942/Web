import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  university_id: number;
  
  @Column({ length: 100 })
  university_name: string; 
}