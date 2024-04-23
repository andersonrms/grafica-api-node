/*
  Warnings:

  - You are about to drop the column `register` on the `costumers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `costumers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `costumers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "costumers_register_key";

-- AlterTable
ALTER TABLE "costumers" DROP COLUMN "register",
ADD COLUMN     "document" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "costumers_document_key" ON "costumers"("document");
