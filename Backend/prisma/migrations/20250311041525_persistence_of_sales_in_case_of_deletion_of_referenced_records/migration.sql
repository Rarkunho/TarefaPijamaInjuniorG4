/*
  Warnings:

  - The primary key for the `sales_pajamas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `sales_pajamas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sales_pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "saleId" TEXT,
    "pajamaId" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_sales_pajamas" ("pajamaId", "price", "quantity", "saleId") SELECT "pajamaId", "price", "quantity", "saleId" FROM "sales_pajamas";
DROP TABLE "sales_pajamas";
ALTER TABLE "new_sales_pajamas" RENAME TO "sales_pajamas";
CREATE UNIQUE INDEX "sales_pajamas_saleId_pajamaId_key" ON "sales_pajamas"("saleId", "pajamaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
