import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("keywords")
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;
}
