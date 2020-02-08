import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity('user')
export default class User extends BaseEntity {
  @PrimaryColumn({ length: 45 })
  id: string;

  @Column({ length: 200, nullable: false })
  pw: string;

  @Column({ length: 45, nullable: false })
  name: string;
}