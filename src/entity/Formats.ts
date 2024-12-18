import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
