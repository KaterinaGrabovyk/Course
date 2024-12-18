import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("publishings")
export class Publishing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;
}
