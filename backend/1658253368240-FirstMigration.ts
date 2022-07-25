import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1658253368240 implements MigrationInterface {
    name = 'FirstMigration1658253368240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "description" varchar(200), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_25484e101f2898a2cb37d1e9273" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_4e6d3e5bcdc2d27ae9ee82f21aa" DEFAULT getdate(), "userId" int NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "firstName" varchar(100), "lastName" varchar(100), "email" varchar(100) NOT NULL, "username" varchar(100) NOT NULL, "salt" nvarchar(255) NOT NULL, "password" varchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(50) NOT NULL, "description" text NOT NULL, "filename" varchar(50) NOT NULL, "views" int NOT NULL CONSTRAINT "DF_429d10baf288684cef5ec9ceaf2" DEFAULT 0, "isPublished" int NOT NULL CONSTRAINT "DF_05f2163d0f68dfd0f958d5e2a38" DEFAULT 1, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
