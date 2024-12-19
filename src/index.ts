import { AppDataSource } from "./data-source";
import { Creator } from "./entity/Creators";
import { Keyword } from "./entity/Keywords";
import { Format } from "./entity/Formats";
import { Type } from "./entity/Types";
import { Publishing } from "./entity/Publishing";
import { Series } from "./entity/Series";
import { Book } from "./entity/Books";
import { keywordsA } from "./utils/keywords";
import { names, surnames, plot } from "./utils/names";
import { typesA, publishingsA } from "./utils/Ty.Pub";

function getRandomStatus() {
  const statuses = [true, false, null];
  return statuses[Math.floor(Math.random() * statuses.length)];
}
function generateISBN13() {
  const prefix = "978";
  const randomDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  );
  const partialISBN = prefix + randomDigits.join("");

  const checksum =
    partialISBN
      .split("")
      .reduce(
        (sum, digit, index) =>
          sum + (index % 2 === 0 ? parseInt(digit) : parseInt(digit) * 3),
        0
      ) % 10;

  const checkDigit = checksum === 0 ? 0 : 10 - checksum;
  return `${partialISBN}${checkDigit}`;
}

AppDataSource.initialize()
  .then(async () => {
    // *1

    let types = Array.from({ length: 10 }, (_, i) => {
      const type = new Type();
      type.title = `${typesA[0]}${i}`;
      return type;
    });
    await AppDataSource.getRepository(Type).save(types);
    console.log("types");
    // *2

    let formats = Array.from({ length: 10 }, (_, i) => {
      const format = new Format();
      format.thickness = parseFloat((Math.random() * 4 + 1).toFixed(1));
      format.height = parseFloat((Math.random() * 5 + 20).toFixed(1));
      format.width = parseFloat((Math.random() * 5 + 14).toFixed(1));
      return format;
    });
    await AppDataSource.getRepository(Format).save(formats);
    console.log("formats");
    // *3

    let publishings = Array.from({ length: publishingsA.length }, (_, i) => {
      const publishing = new Publishing();
      publishing.title = publishingsA[i];
      return publishing;
    });
    await AppDataSource.getRepository(Publishing).save(publishings);
    console.log("publishings");
    // *4
    let creators = Array.from({ length: 5000 }, (_, i) => {
      const creator = new Creator();
      creator.name = `${names[0]}${i}`;
      creator.name = `${surnames[0]}${i}`;
      return creator;
    });
    await AppDataSource.getRepository(Creator).save(creators);
    console.log("creators");
    // *5
    let keywords = Array.from({ length: keywordsA.length }, (_, i) => {
      const keyword = new Keyword();
      keyword.name = keywordsA[i];
      return keyword;
    });
    await AppDataSource.getRepository(Keyword).save(keywords);
    console.log("keywords");
    // *6
    function randomForKeywords() {
      const numKeywords = Math.floor(Math.random() * 5) + 1;
      const selectedKeywords = [];
      for (let j = 0; j < numKeywords; j++) {
        const randomKeyword =
          keywords[Math.floor(Math.random() * keywords.length)];

        if (!selectedKeywords.includes(randomKeyword)) {
          selectedKeywords.push(randomKeyword);
        }
      }
      return selectedKeywords;
    }
    function randomForCreators() {
      const numCreators = Math.floor(Math.random() * 3) + 1;
      const selectedCreators = [];

      for (let j = 0; j < numCreators; j++) {
        const randomCreator =
          creators[Math.floor(Math.random() * creators.length)];

        if (!selectedCreators.includes(randomCreator)) {
          selectedCreators.push(randomCreator);
        }
      }
      return selectedCreators;
    }

    let serieses = Array.from({ length: 100000 }, (__, i) => {
      const series = new Series();
      series.title = `series${i}`;
      series.age = Math.floor(Math.random() * 18);
      series.amount_origin = Math.floor(Math.random() * 100 + 1);
      series.amount_translated =
        series.amount_origin -
        Math.floor(Math.random() * series.amount_origin + 1);
      series.status_original = getRandomStatus();
      if (series.status_original == true) {
        series.status_translation = getRandomStatus();
      } else {
        const restrictedStatuses = [false, null];
        series.status_original =
          restrictedStatuses[
            Math.floor(Math.random() * restrictedStatuses.length)
          ];
      }
      series.publishing_id =
        publishings[Math.floor(Math.random() * publishings.length)];
      series.format_id = formats[Math.floor(Math.random() * formats.length)];
      series.type_id = types[Math.floor(Math.random() * types.length)];
      series.keywords_id = randomForKeywords();
      series.creator_id = randomForCreators();
      return series;
    });
    await AppDataSource.getRepository(Series).save(serieses, { chunk: 5000 });
    console.log("serieses");
    // *7

    let books = Array.from({ length: 1000000 }, (_, i) => {
      const book = new Book();
      book.series_id = serieses[Math.floor(Math.random() * serieses.length)];
      book.name = book.series_id.title;
      book.number = Math.floor(
        Math.random() * book.series_id.amount_translated
      );
      book.plot = plot;
      book.pages = Math.floor(Math.random() * 476 + 24);
      book.price = parseFloat((Math.random() * 200 + 200).toFixed(2));
      book.isbn = generateISBN13();
      book.amount_in_storage = Math.floor(Math.random() * 500);
      if (book.amount_in_storage === 0) {
        book.in_stock = false;
      } else {
        book.in_stock = true;
      }
      return book;
    });
    await AppDataSource.getRepository(Book).save(books, { chunk: 5000 });
    console.log("books");
  })
  .catch((error) => console.log(error));
