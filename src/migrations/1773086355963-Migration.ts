import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1773086355963 implements MigrationInterface {
    name = 'Migration1773086355963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_eba0b799b26599a4933b64d511f"`);
        await queryRunner.query(`CREATE TABLE "attendee_groups" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "contact_person_name" character varying NOT NULL, "contact_person_phone" character varying NOT NULL, "contact_person_email" character varying, "number_heads" integer NOT NULL, CONSTRAINT "PK_eba4fdec75d4259199629eba999" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP COLUMN "field_value"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP COLUMN "field_id"`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD "responses" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendees" ADD "firstTime" boolean`);
        await queryRunner.query(`ALTER TABLE "attendees" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendees" ADD CONSTRAINT "UQ_86a0965a5d83e0bba3a7d1869e0" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendees" DROP CONSTRAINT "UQ_86a0965a5d83e0bba3a7d1869e0"`);
        await queryRunner.query(`ALTER TABLE "attendees" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendees" DROP COLUMN "firstTime"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP COLUMN "responses"`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD "field_id" integer`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD "field_value" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "attendee_groups"`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_eba0b799b26599a4933b64d511f" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
