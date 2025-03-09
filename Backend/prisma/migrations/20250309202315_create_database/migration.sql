-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sales_pajamas" (
    "saleId" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    "addressId" TEXT,
    CONSTRAINT "sales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pajama_sizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "pajama_sizes_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "onSale" BOOLEAN NOT NULL,
    "salePercent" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sales_pajamas_saleId_pajamaId_key" ON "sales_pajamas"("saleId", "pajamaId");
