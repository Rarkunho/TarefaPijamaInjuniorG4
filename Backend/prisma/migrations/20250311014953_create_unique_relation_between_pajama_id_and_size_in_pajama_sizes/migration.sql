/*
  Warnings:

  - A unique constraint covering the columns `[pajamaId,size]` on the table `pajama_sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pajama_sizes_pajamaId_size_key" ON "pajama_sizes"("pajamaId", "size");
