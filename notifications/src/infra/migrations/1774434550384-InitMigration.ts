import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1774434550384 implements MigrationInterface {
    name = 'InitMigration1774434550384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" ADD "senderImage" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" DROP COLUMN "senderImage"`);
    }

}
