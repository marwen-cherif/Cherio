/*
  Warnings:

  - You are about to drop the column `previsionalDate` on the `QuotationLine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuotationLine" DROP COLUMN "previsionalDate",
ADD COLUMN     "forecastDate" DATE;
