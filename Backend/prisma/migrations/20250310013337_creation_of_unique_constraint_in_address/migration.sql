/*
  Warnings:

  - A unique constraint covering the columns `[zipCode,state,city,neighborhood,address,number]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "address_zipCode_state_city_neighborhood_address_number_key" ON "address"("zipCode", "state", "city", "neighborhood", "address", "number");
