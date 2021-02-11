import {MigrationInterface, QueryRunner} from "typeorm";

export class init1613063106817 implements MigrationInterface {
    name = 'init1613063106817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "biography" character varying, "isActive" boolean NOT NULL DEFAULT true, "followers" integer NOT NULL DEFAULT '0', "following" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post" character varying NOT NULL, "favorites" integer NOT NULL, "replies" integer NOT NULL, "retweets" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweet" ADD CONSTRAINT "FK_a9703cf826200a2d155c22eda96" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_a9703cf826200a2d155c22eda96"`);
        await queryRunner.query(`DROP TABLE "tweet"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
