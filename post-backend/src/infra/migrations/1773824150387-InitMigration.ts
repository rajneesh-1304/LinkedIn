import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773824150387 implements MigrationInterface {
    name = 'InitMigration1773824150387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Repost" ADD "repostedBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Repost" DROP COLUMN "repostedBy"`);
    }

}
