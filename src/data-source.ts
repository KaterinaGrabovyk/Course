import "reflect-metadata";
import { DataSource } from "typeorm";
import { Creator } from "./entity/Creators";
import { Keyword } from "./entity/Keywords";
import { Format } from "./entity/Formats";
import { Type } from "./entity/Types";
import { Publishing } from "./entity/Publishing";
import { Series } from "./entity/Series";
import { Book } from "./entity/Books";
import { Init1734534560400 } from "./migration/1734534560400-init";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Katy",
  database: "manga_store",
  synchronize: true,
  logging: false,
  entities: [Creator, Keyword, Format, Type, Publishing, Series, Book],
  migrations: [Init1734534560400],
  subscribers: [],
  dropSchema: true,
});
