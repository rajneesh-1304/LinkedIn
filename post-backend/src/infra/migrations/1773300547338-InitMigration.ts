import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773300547338 implements MigrationInterface {
    name = 'InitMigration1773300547338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP COLUMN "createdAt"`);
    }

}
