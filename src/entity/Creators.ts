import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from "typeorm";
import { Series } from "./Series";
@Entity("creators")
export class Creator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @Column({ nullable: true })
  surname: string;

  @ManyToMany(() => Series, (series) => series.id)
  series_id: Series[];
}
