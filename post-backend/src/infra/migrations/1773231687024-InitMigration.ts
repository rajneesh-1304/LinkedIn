import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773231687024 implements MigrationInterface {
    name = 'InitMigration1773231687024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" ADD "parentId" character varying`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD "comment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP COLUMN "parentId"`);
    }

}
