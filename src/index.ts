import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
  console.log("Database was created/connected");
});