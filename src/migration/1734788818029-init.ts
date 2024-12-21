import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734788818029 implements MigrationInterface {
    name = 'Init1734788818029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_2e118b30bca11285af978d9e6bf"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_5f9976a0559a8e4da1549f4faa7"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_65a9e8b87cea5794c36317c15e1"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "publishingIdId"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "typeIdId"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "formatIdId"`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "publishing_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "type_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "format_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_0e80907c3b30662bbce5c5557da" FOREIGN KEY ("publishing_id") REFERENCES "publishings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_4354cdd421109dd5210c6a9b5d1" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_27fe765606120a5e44864bd4b38" FOREIGN KEY ("format_id") REFERENCES "formats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_27fe765606120a5e44864bd4b38"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_4354cdd421109dd5210c6a9b5d1"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP CONSTRAINT "FK_0e80907c3b30662bbce5c5557da"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "format_id"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "type_id"`);
        await queryRunner.query(`ALTER TABLE "Series" DROP COLUMN "publishing_id"`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "formatIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "typeIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Series" ADD "publishingIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_65a9e8b87cea5794c36317c15e1" FOREIGN KEY ("formatIdId") REFERENCES "formats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_5f9976a0559a8e4da1549f4faa7" FOREIGN KEY ("typeIdId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Series" ADD CONSTRAINT "FK_2e118b30bca11285af978d9e6bf" FOREIGN KEY ("publishingIdId") REFERENCES "publishings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
