import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1708700572417 implements MigrationInterface {
    name = 'Mig1708700572417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "article_body" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "article_body"`);
    }

}
