import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
} from "typeorm";

import { Series } from "./Series";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Series, (series) => series.id)
  series_id: Series;

  @Column({ nullable: false, type: "int" })
  number: number;

  @Column({ nullable: false, type: "text" })
  plot: string;

  @Column({ nullable: false, type: "int" })
  pages: number;

  @Column({ nullable: false, type: "money" })
  price: number;

  @Column({ nullable: false })
  @Index()
  isbn: string;

  @Column({ nullable: false, type: "bigint" })
  amount_in_storage: number;

  @Column({ nullable: false, type: "bool" })
  in_stock: boolean;
}
