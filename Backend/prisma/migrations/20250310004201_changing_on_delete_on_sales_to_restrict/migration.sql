/*
  Warnings:

  - Made the column `addressId` on table `sales` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyerName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "cardNumber" TEXT,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "sales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sales" ("addressId", "buyerName", "cardNumber", "cpf", "id", "installments", "paymentMethod", "price") SELECT "addressId", "buyerName", "cardNumber", "cpf", "id", "installments", "paymentMethod", "price" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
