import { AppDataSource } from "./data-source";
import { Creator } from "./entity/Creators";
import { Series } from "./entity/Series";
import { Book } from "./entity/Books";

AppDataSource.initialize()
  .then(async () => {
    console.time("search manga by specific keyword");
    await AppDataSource.getRepository(Series)
    .createQueryBuilder("series")
    .innerJoinAndSelect("series.keywords", "keyword")
    .orWhere("keyword.name LIKE :keyword", { keyword: `%пригоди%` })
    .getRawMany();
    console.timeEnd("search manga by specific keyword");
  })
  .catch((error) => console.log(error));
// console.time("search manga by specific keyword");
// await AppDataSource.getRepository(Book)
//   .createQueryBuilder("books")
//   .leftJoinAndSelect("books.series", "s")
//   .leftJoinAndSelect("series.publishing", "p")
//   .leftJoinAndSelect("s.keywords", "k")
//   .where("k.name ILIKE :keyword", { keyword: "%пригоди%" })
//   .orderBy("b.price", "DESC")
//   .select([
//     "b.name AS Book_title",
//     "s.title AS Series",
//     "p.title AS Publishing",
//     "b.price AS Price",
//   ])
//   .getRawMany();
// console.timeEnd("search manga by specific keyword");
// console.time("search books from a specific series");
// await AppDataSource.getRepository(Book)
//   .createQueryBuilder("b")
//   .leftJoinAndSelect("b.series", "s")
//   .where("s.title = :seriesTitle", { seriesTitle: "series50765" })
//   .orderBy("b.number", "ASC")
//   .select([
//     "b.name AS Book_title",
//     "b.number AS Book_number",
//     "b.price AS Price",
//     "b.in_stock AS In_stock",
//   ])
//   .getRawMany();
// console.timeEnd("search books from a specific series");
// console.time("get series by publishing");
// await AppDataSource.getRepository(Series)
//   .createQueryBuilder("s")
//   .leftJoinAndSelect("s.publishing", "p")
//   .where("p.title = :publishingTitle", { publishingTitle: "Nasha Idea" })
//   .select(["s.title AS Series"])
//   .getRawMany();
// console.timeEnd("get series by publishing");
// console.time("update translated volumes count by series title");

// await AppDataSource.getRepository(Series)
//   .createQueryBuilder("s")
//   .update(Series)
//   .set({
//     amount_translated: () => "amount_translated + 1",
//   })
//   .where("s.title = :seriesTitle", { seriesTitle: "series5" })
//   .execute();

// console.timeEnd("update translated volumes count by series title");
// console.time("insert 20 new authors");

// const authorsData = [];
// for (let i = 1; i <= 20; i++) {
//   authorsData.push({
//     name: `Author ${i}`,
//   });
// }

// await AppDataSource.getRepository(Creator).insert(authorsData);

// console.timeEnd("insert 20 new authors");
// console.time("insert 500 new books");
// const booksData = [];
// for (let i = 1; i <= 500; i++) {
//   booksData.push({
//     name: `Book ${i}`,
//     series_id: i,
//     isbn: `ISBN-${i}`,
//     number: i,
//     plot: "Generic plot text",
//     pages: 200,
//     price: 200,
//     amount_in_storage: 100,
//     in_stock: true,
//     publishing_id: 5,
//   });
// }

// await AppDataSource.getRepository(Book).insert(booksData);

// console.timeEnd("insert 500 new books");
