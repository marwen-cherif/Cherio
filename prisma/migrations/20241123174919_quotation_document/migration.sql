/*
  Warnings:

  - A unique constraint covering the columns `[quotationId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "quotationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Document_quotationId_key" ON "Document"("quotationId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
