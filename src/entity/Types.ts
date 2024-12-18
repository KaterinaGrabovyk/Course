import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("types")
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;
}
