-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sales_pajamas" (
    "saleId" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,

    PRIMARY KEY ("saleId", "pajamaId"),
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sales_pajamas" ("pajamaId", "price", "quantity", "saleId") SELECT "pajamaId", "price", "quantity", "saleId" FROM "sales_pajamas";
DROP TABLE "sales_pajamas";
ALTER TABLE "new_sales_pajamas" RENAME TO "sales_pajamas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
