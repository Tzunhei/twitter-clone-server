import {MigrationInterface, QueryRunner} from "typeorm";

export class User1613055591720 implements MigrationInterface {
    name = 'User1613055591720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "biography" character varying NOT NULL, "isActive" boolean NOT NULL, "followers" integer NOT NULL, "following" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
