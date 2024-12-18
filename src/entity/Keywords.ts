import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from "typeorm";
import { Series } from "./Series";

@Entity("keywords")
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @ManyToMany(() => Series, (series) => series.id)
  series_id: Series[];
}
