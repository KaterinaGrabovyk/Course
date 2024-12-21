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
    console.time("search books from a specific series");
    await AppDataSource.getRepository(Book)
      .createQueryBuilder("books")
      .leftJoinAndSelect("books.series_id", "series_id")
      .where("series_id.title = :seriesTitle", { seriesTitle: "series50765" })
      .orderBy("books.number", "ASC")
      .select([
        "books.name AS Book_title",
        "books.number AS Book_number",
        "books.price AS Price",
        "books.in_stock AS In_stock",
      ])
      .getRawMany();
    console.timeEnd("search books from a specific series");
    console.time("get series by publishing");
    await AppDataSource.getRepository(Series)
      .createQueryBuilder("series")
      .leftJoinAndSelect("series.publishing", "publishing")
      .where("publishing.title = :publishingTitle", {
        publishingTitle: "Nasha Idea",
      })
      .select(["series.title AS Series"])
      .getRawMany();
    console.timeEnd("get series by publishing");

    console.time("update translated volumes count by series title");
    await AppDataSource.createQueryBuilder()
      .update(Series)
      .set({
        amount_translated: () => `"amount_translated" + 1`,
      })
      .where("title = :seriesTitle", { seriesTitle: "series0" })
      .execute();
    console.timeEnd("update translated volumes count by series title");

    const authorsData = [];
    for (let i = 1; i <= 500; i++) {
      authorsData.push({
        name: `Author ${i}`,
      });
    }
    console.time("insert 500 new authors");
    await AppDataSource.getRepository(Creator).insert(authorsData);
    console.timeEnd("insert 500 new authors");
    console.time("get types with series count");
    await AppDataSource.getRepository(Series)
      .createQueryBuilder("series")
      .leftJoin("series.type", "type")
      .groupBy("type.id")
      .orderBy("COUNT(series.id)", "DESC")
      .select([
        "type.title AS Type",
        "COUNT(series.id) AS Amount_of_serieses",
      ])
      .getRawMany();
    console.timeEnd("get types with series count");
    const newSeries = [];
    newSeries.push({
      title: "Test-series",
      age: 17,
      amount_origin: 50005,
      amount_translated: 50000,
      status_original: true,
      status_translation: false,
      format: 1,
      type: 1,
      publishing: 1,
    });
    console.time("Create test series");
    await AppDataSource.getRepository(Series).save(newSeries);
    console.timeEnd("Create test series");
    const booksData = [];
    for (let i = 1; i <= 50000; i++) {
      booksData.push({
        name: `Book ${i}`,
        number: i,
        plot: "Generic plot text",
        pages: 200,
        price: 200,
        series_id: 10001,
        isbn: "12345",
        amount_in_storage: i,
        in_stock: true,
        publishing_id: 5,
      });
    }
    console.time("insert 50000 new books");
    await AppDataSource.getRepository(Book).save(booksData, { chunk: 5000 });
    console.timeEnd("insert 50000 new books");

    console.time("Delete 50000 books");
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Book)
      .where("plot = :text", { text: "Generic plot text" })
      .execute();
    console.timeEnd("Delete 50000 books");
  })
  .catch((error) => console.log(error));
