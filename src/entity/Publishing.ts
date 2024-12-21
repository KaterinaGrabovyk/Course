import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Series } from "./Series";
@Entity("publishings")
export class Publishing {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  @Index()
  title: string;
  @OneToMany(() => Series, (series) => series.publishing)
  serieses: Series[];
}
