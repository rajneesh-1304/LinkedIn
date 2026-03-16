import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773308595443 implements MigrationInterface {
    name = 'InitMigration1773308595443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Repost" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_900ea66e2176baa451346b01c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Repost" ADD CONSTRAINT "FK_8545efb52cdd485f29000864589" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Repost" DROP CONSTRAINT "FK_8545efb52cdd485f29000864589"`);
        await queryRunner.query(`DROP TABLE "Repost"`);
    }

}
