import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773812202305 implements MigrationInterface {
    name = 'InitMigration1773812202305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" ADD "senderName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" DROP COLUMN "senderName"`);
    }

}
