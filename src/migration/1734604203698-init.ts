import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734604203698 implements MigrationInterface {
    name = 'Init1734604203698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "types" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e977df1450623178d6160c9185" ON "types" ("title") `);
        await queryRunner.query(`CREATE TABLE "publishings" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_e0f0deb7fc0b83d144a31f6c038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c36489e3f6a9442d874b307762" ON "publishings" ("title") `);
        await queryRunner.query(`CREATE TABLE "formats" ("id" SERIAL NOT NULL, "thickness" double precision NOT NULL, "height" double precision NOT NULL, "width" double precision NOT NULL, CONSTRAINT "PK_e99e1793fec9a30a4b463b46869" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keywords" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4aa660a7a585ed828da68f3c28e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b06f22a51417a28bacbefac1f" ON "keywords" ("name") `);
        await queryRunner.query(`CREATE TABLE "Series" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "age" integer NOT NULL, "amount_origin" integer NOT NULL, "amount_translated" integer NOT NULL, "status_original" boolean, "status_translation" boolean, "publishingIdId" integer, "typeIdId" integer, "formatIdId" integer, CONSTRAINT "PK_c2b16b9595c21f34d4f31067d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_988b9d6a28559a8f4496cf842c" ON "Series" ("title") `);
        await queryRunner.query(`CREATE TABLE "creators" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, CONSTRAINT "PK_b27dd693f7df17bbfc21f00166a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aedbde31d05911380caff5903c" ON "creators" ("name") `);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying, "number" integer NOT NULL, "plot" text NOT NULL, "pages" integer NOT NULL, "price" money NOT NULL, "isbn" character varying NOT NULL, "amount_in_storage" bigint NOT NULL, "in_stock" boolean NOT NULL, "seriesIdId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54337dc30d9bb2c3fadebc6909" ON "books" ("isbn") `);
        await queryRunner.query(`CREATE TABLE "creators_series" ("seriesId" integer NOT NULL, "creatorsId" integer NOT NULL, CONSTRAINT "PK_0dfc76e7ab8bdaceddc8cb19e35" PRIMARY KEY ("seriesId", "creatorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4a5e90dbc953113c3270e6de08" ON "creators_series" ("seriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdd38139b5e42534c69fceb227" ON "creators_series" ("creatorsId") `);
        await queryRunner.query(`CREATE TABLE "keywords_series" ("seriesId" integer NOT NULL, "keywordsId" integer NOT NULL, CONSTRAINT "PK_ce077ec5ca99b026e7e85f1dc9e" PRIMARY KEY ("seriesId", "keywordsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa3e0ba590351a44ad331c523a" ON "keywords_series" ("seriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9a808e7e3d7bbd7e9758a7ec3" ON "keywords_series" ("keywordsId") `);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_2e118b30bca11285af978d9e6bf" FOREIGN KEY ("publishingIdId") REFERENCES "publishings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_5f9976a0559a8e4da1549f4faa7" FOREIGN KEY ("typeIdId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_65a9e8b87cea5794c36317c15e1" FOREIGN KEY ("formatIdId") REFERENCES "formats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_4f10b2a78d0da1b1fcd3c31ab42" FOREIGN KEY ("seriesIdId") REFERENCES "Series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creators_series" ADD CONSTRAINT "FK_4a5e90dbc953113c3270e6de080" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "creators_series" ADD CONSTRAINT "FK_cdd38139b5e42534c69fceb2273" FOREIGN KEY ("creatorsId") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "keywords_series" ADD CONSTRAINT "FK_aa3e0ba590351a44ad331c523a6" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "keywords_series" ADD CONSTRAINT "FK_c9a808e7e3d7bbd7e9758a7ec33" FOREIGN KEY ("keywordsId") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keywords_series" DROP CONSTRAINT "FK_c9a808e7e3d7bbd7e9758a7ec33"`);
        await queryRunner.query(`ALTER TABLE "keywords_series" DROP CONSTRAINT "FK_aa3e0ba590351a44ad331c523a6"`);
        await queryRunner.query(`ALTER TABLE "creators_series" DROP CONSTRAINT "FK_cdd38139b5e42534c69fceb2273"`);
        await queryRunner.query(`ALTER TABLE "creators_series" DROP CONSTRAINT "FK_4a5e90dbc953113c3270e6de080"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_4f10b2a78d0da1b1fcd3c31ab42"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_65a9e8b87cea5794c36317c15e1"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_5f9976a0559a8e4da1549f4faa7"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_2e118b30bca11285af978d9e6bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9a808e7e3d7bbd7e9758a7ec3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa3e0ba590351a44ad331c523a"`);
        await queryRunner.query(`DROP TABLE "keywords_series"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdd38139b5e42534c69fceb227"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a5e90dbc953113c3270e6de08"`);
        await queryRunner.query(`DROP TABLE "creators_series"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54337dc30d9bb2c3fadebc6909"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aedbde31d05911380caff5903c"`);
        await queryRunner.query(`DROP TABLE "creators"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_988b9d6a28559a8f4496cf842c"`);
        await queryRunner.query(`DROP TABLE "Series"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b06f22a51417a28bacbefac1f"`);
        await queryRunner.query(`DROP TABLE "keywords"`);
        await queryRunner.query(`DROP TABLE "formats"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c36489e3f6a9442d874b307762"`);
        await queryRunner.query(`DROP TABLE "publishings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e977df1450623178d6160c9185"`);
        await queryRunner.query(`DROP TABLE "types"`);
    }

}
