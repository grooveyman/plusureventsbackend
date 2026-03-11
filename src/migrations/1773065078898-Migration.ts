import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1773065078898 implements MigrationInterface {
    name = 'Migration1773065078898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registrations" ("id" SERIAL NOT NULL, "field_value" character varying NOT NULL, "event_id" integer, "field_id" integer, CONSTRAINT "PK_6013e724d7b22929da9cd7282d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_c082d66f7080c743a96c1e91807" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_eba0b799b26599a4933b64d511f" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_eba0b799b26599a4933b64d511f"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_c082d66f7080c743a96c1e91807"`);
        await queryRunner.query(`DROP TABLE "registrations"`);
    }

}
