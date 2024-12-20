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

  @ManyToMany(() => Creator)
  @JoinTable({
    name: "creators_series",
    joinColumn: { name: "series_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "creator_id", referencedColumnName: "id" },
  })
  creators: Creator[];

  @ManyToMany(() => Keyword)
  @JoinTable({
    name: "keywords_series",
    joinColumn: { name: "series_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "keyword_id", referencedColumnName: "id" },
  })
  keywords: Keyword[];
}
