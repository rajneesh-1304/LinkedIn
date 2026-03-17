import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773728547236 implements MigrationInterface {
    name = 'InitMigration1773728547236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Inbox" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "messageId" character varying NOT NULL, "handler" character varying NOT NULL, CONSTRAINT "PK_bb34f42fe318b185796b7e751fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "message" character varying NOT NULL, "receiverId" character varying NOT NULL, "senderId" character varying NOT NULL, "isSeen" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da18f6446b6fea585f01d03f56c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Notification"`);
        await queryRunner.query(`DROP TABLE "Inbox"`);
    }

}
