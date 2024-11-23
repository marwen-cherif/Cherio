/*
  Warnings:

  - Added the required column `tenantId` to the `PredefinedActType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PredefinedActType" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "testField" TEXT;

-- AddForeignKey
ALTER TABLE "PredefinedActType" ADD CONSTRAINT "PredefinedActType_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
