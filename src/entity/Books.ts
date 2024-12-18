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

  @ManyToOne(() => Series, (series) => series.id)
  series_id: Series;

  @Column({ nullable: false, type: "int" })
  number: number;

  @Column({ nullable: true, type: "text" })
  plot: string;

  @Column({ nullable: false, type: "int" })
  pages: number;

  @Column({ nullable: false, type: "money" })
  price: number;

  @Column({ nullable: false, type: "numeric" })
  @Index()
  isbn: number;

  @Column({ nullable: false, type: "bigint" })
  amount_in_storage: number;

  @Column({ nullable: false, type: "bool" })
  in_stock: boolean;
}
