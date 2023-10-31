import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ length: 60 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // 10 - количество раундов хеширования
  }
}