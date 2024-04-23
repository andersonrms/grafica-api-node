/*
  Warnings:

  - A unique constraint covering the columns `[register]` on the table `costumers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "costumers_register_key" ON "costumers"("register");
