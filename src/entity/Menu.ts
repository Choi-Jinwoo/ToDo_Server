import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from './User'

@Entity('menu')
export default class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 45, nullable: false })
  name: string

  @ManyToOne(type => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column('string')
  user_id: string;
}