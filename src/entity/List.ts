import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Menu from './Menu';

@Entity('list')
export default class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 150, nullable: false })
  content: string

  @Column({ name: 'is_checked', nullable: false, default: false })
  is_checked: boolean

  @ManyToOne(() => Menu, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'menu_idx' })
  menu: Menu;
  @Column('int')
  menu_idx: number;
}