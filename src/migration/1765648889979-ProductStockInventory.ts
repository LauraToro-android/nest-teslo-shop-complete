import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductStockInventory1765648889979 implements MigrationInterface {
    name = 'ProductStockInventory1765648889979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_stocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" text NOT NULL, "quantity" integer NOT NULL, "productId" uuid, CONSTRAINT "PK_3e6eefa449c5773c5fe43ab113d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_stocks" ADD CONSTRAINT "FK_5e5755d032c1551a16f4393cd9d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stocks" DROP CONSTRAINT "FK_5e5755d032c1551a16f4393cd9d"`);
        await queryRunner.query(`DROP TABLE "product_stocks"`);
    }

}
