/*
  Warnings:

  - You are about to drop the column `zip_code` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `stock_quantity` on the `pajama_sizes` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_name` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `sales` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL
);
INSERT INTO "new_address" ("address", "city", "id", "neighborhood", "number", "state") SELECT "address", "city", "id", "neighborhood", "number", "state" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE TABLE "new_pajama_sizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "pajama_sizes_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pajama_sizes" ("id", "pajamaId", "size") SELECT "id", "pajamaId", "size" FROM "pajama_sizes";
DROP TABLE "pajama_sizes";
ALTER TABLE "new_pajama_sizes" RENAME TO "pajama_sizes";
CREATE TABLE "new_sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyerName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "cardNumber" TEXT,
    "addressId" TEXT,
    CONSTRAINT "sales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_sales" ("addressId", "cpf", "id", "installments", "price") SELECT "addressId", "cpf", "id", "installments", "price" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
CREATE TABLE "new_sales_pajamas" (
    "saleId" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,

    PRIMARY KEY ("saleId", "pajamaId"),
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sales_pajamas" ("pajamaId", "price", "quantity", "saleId") SELECT "pajamaId", "price", "quantity", "saleId" FROM "sales_pajamas";
DROP TABLE "sales_pajamas";
ALTER TABLE "new_sales_pajamas" RENAME TO "sales_pajamas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
