import "reflect-metadata";
import { DataSource } from "typeorm";
import { Creator } from "./entity/Creators";
import { Keyword } from "./entity/Keywords";
import { Format } from "./entity/Formats";
import { Type } from "./entity/Types";
import { Publishing } from "./entity/Publishing";
import { Series } from "./entity/Series";
import { Book } from "./entity/Books";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost", 
  port: Number(process.env.POSTGRES_PORT) || 5433,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Katy",
  database: process.env.POSTGRES_DB || "manga_store", 
  synchronize: process.env.NODE_ENV === 'development', 
  logging: process.env.NODE_ENV === 'development', 
  entities: [Creator, Keyword, Format, Type, Publishing, Series, Book],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
  dropSchema: false, 
});