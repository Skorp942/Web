import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Groups } from 'src/Groups/groups.entity';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column()
  birthdate: Date;

  @ManyToOne(() => Groups, groups => groups.students)
  group: Groups;

  @Column()
  admission_year: number;
}