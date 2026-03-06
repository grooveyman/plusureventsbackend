import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1772753190927 implements MigrationInterface {
    name = 'InitialMigration1772753190927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`field_option\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`option_value\` varchar(255) NOT NULL, \`field_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fields\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(50) NOT NULL, \`field_type\` varchar(50) NOT NULL, \`is_required\` tinyint NOT NULL DEFAULT 0, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`verifyToken\` varchar(200) NOT NULL, \`isEmailVerified\` enum ('1', '0') NOT NULL DEFAULT '0', \`emailVerifiedExpiry\` timestamp NULL, \`phone\` varchar(20) NOT NULL DEFAULT '0000000000', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`events\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`hasGroup\` tinyint NOT NULL DEFAULT 0, \`start_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiry_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expect_attendees\` int NOT NULL, \`flyer\` varchar(255) NULL, \`flyerPublicId\` varchar(255) NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`form_access\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendees\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`lastname\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`residence\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_26867fb1383d362454919fd9af\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`field_option\` ADD CONSTRAINT \`FK_54b35573e64728ec0b25f607a41\` FOREIGN KEY (\`field_id\`) REFERENCES \`fields\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fields\` ADD CONSTRAINT \`FK_28905cdb1c6a3074db891c1955c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD CONSTRAINT \`FK_09f256fb7f9a05f0ed9927f406b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_access\` ADD CONSTRAINT \`FK_90d28cca4d340bce645c1a03f8c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_access\` DROP FOREIGN KEY \`FK_90d28cca4d340bce645c1a03f8c\``);
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_09f256fb7f9a05f0ed9927f406b\``);
        await queryRunner.query(`ALTER TABLE \`fields\` DROP FOREIGN KEY \`FK_28905cdb1c6a3074db891c1955c\``);
        await queryRunner.query(`ALTER TABLE \`field_option\` DROP FOREIGN KEY \`FK_54b35573e64728ec0b25f607a41\``);
        await queryRunner.query(`DROP INDEX \`IDX_26867fb1383d362454919fd9af\` ON \`attendees\``);
        await queryRunner.query(`DROP TABLE \`attendees\``);
        await queryRunner.query(`DROP TABLE \`form_access\``);
        await queryRunner.query(`DROP TABLE \`events\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`fields\``);
        await queryRunner.query(`DROP TABLE \`field_option\``);
    }

}
