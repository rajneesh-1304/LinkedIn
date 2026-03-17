import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773750687063 implements MigrationInterface {
    name = 'InitMigration1773750687063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" ALTER COLUMN "isSeen" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notification" ALTER COLUMN "isSeen" DROP DEFAULT`);
    }

}
