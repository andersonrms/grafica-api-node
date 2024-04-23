/*
  Warnings:

  - Added the required column `cep` to the `costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `costumers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "costumers" ADD COLUMN     "cep" INTEGER NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL,
ALTER COLUMN "document" SET DATA TYPE TEXT;
