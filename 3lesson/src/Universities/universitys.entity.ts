import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Groups } from 'src/Groups/groups.entity';

@Entity()
export class Universitys {
  @PrimaryGeneratedColumn()
  university_id: number;

  @Column({ length: 100 })
  university_name: string;

  @OneToMany(() => Groups, groups => groups.university)
  groups: Groups[];
}