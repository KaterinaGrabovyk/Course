import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
@Entity("creators")
export class Creator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @Column({ nullable: true })
  surname: string;
}
