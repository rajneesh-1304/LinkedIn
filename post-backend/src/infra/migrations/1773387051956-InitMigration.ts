import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773387051956 implements MigrationInterface {
    name = 'InitMigration1773387051956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Repost" ADD "content" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Repost" DROP COLUMN "content"`);
    }

}
