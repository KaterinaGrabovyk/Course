import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Type } from "./Types";
import { Publishing } from "./Publishing";
import { Format } from "./Formats";
import { Creator } from "./Creators";
import { Keyword } from "./Keywords";

@Entity("Series")
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;

  @ManyToOne(() => Publishing, (publishing) => publishing.id)
  publishing_id: Publishing;

  @ManyToOne(() => Type, (type) => type.id)
  type_id: Type;

  @Column({ nullable: false, type: "int" })
  age: number;

  @ManyToOne(() => Format, (format) => format.id)
  format_id: Format;

  @Column({ nullable: false, type: "int" })
  amount_origin: number;

  @Column({ nullable: false, type: "int" })
  amount_translated: number;

  @Column({ type: "boolean", nullable: true })
  status_original: boolean | null;

  @Column({ type: "boolean", nullable: true })
  status_translation: boolean | null;

  @ManyToMany(() => Creator, (creator) => creator.id)
  @JoinTable({ name: "creators_series" })
  creator_id: Creator[];

  @ManyToMany(() => Keyword, (keyword) => keyword.id)
  @JoinTable({ name: "keywords_series" })
  keywords_id: Keyword[];
}
