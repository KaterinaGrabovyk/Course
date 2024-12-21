import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Series } from "./Series";

@Entity("types")
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;

  @OneToMany(() => Series, (series) => series.type)
  serieses: Series[];
}
