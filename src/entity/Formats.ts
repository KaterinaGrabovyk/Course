import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Series } from "./Series";
@Entity("formats")
export class Format {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "float" })
  thickness: number;
  @Column({ nullable: false, type: "float" })
  height: number;
  @Column({ nullable: false, type: "float" })
  width: number;
  @OneToMany(() => Series, (series) => series.format)
  serieses: Series[];
}
