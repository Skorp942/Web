import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 50, nullable: true })
  group: string;

  @Column({ length: 100, nullable: true })
  institution: string;

  @Column({ type: 'int', nullable: true })
  admission_year: number;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  subjects: string;

  @Column({ type: 'text', nullable: true })
  grades: string;
}