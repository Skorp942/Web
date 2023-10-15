import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Universitys } from 'src/Universities/universitys.entity';
import { Students } from 'src/Students/students.entity';

@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  group_id: number;

  @Column({ length: 100 })
  group_name: string;

  @ManyToOne(() => Universitys, universitys => universitys.groups)
  university: Universitys;

  @OneToMany(() => Students, students => students.group)
  students: Students[];
}