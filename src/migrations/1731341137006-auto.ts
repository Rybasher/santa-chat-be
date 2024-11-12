import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1731341137006 implements MigrationInterface {
    name = 'Auto1731341137006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "sender" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "chatSessionId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_session" ("id" SERIAL NOT NULL, "sessionId" character varying NOT NULL, "userSessionId" uuid, CONSTRAINT "PK_9017c2ee500cd1ba895752a0aa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAgent" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_033a0247e9d9e34c76617e0e4c1" FOREIGN KEY ("chatSessionId") REFERENCES "chat_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_session" ADD CONSTRAINT "FK_1e01b18673f4e5da4975e3b4caf" FOREIGN KEY ("userSessionId") REFERENCES "user_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_session" DROP CONSTRAINT "FK_1e01b18673f4e5da4975e3b4caf"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_033a0247e9d9e34c76617e0e4c1"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
        await queryRunner.query(`DROP TABLE "chat_session"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
