import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from './User'

@Entity('menu')
export default class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 45, nullable: false })
  name: string

  @ManyToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}