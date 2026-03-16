import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773227790041 implements MigrationInterface {
    name = 'InitMigration1773227790041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_20ede1755cb694ecf15674c8ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`);
        await queryRunner.query(`DROP TABLE "Comment"`);
        await queryRunner.query(`DROP TABLE "Like"`);
    }

}
