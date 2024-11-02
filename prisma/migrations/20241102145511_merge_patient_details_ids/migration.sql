/*
  Warnings:

  - You are about to drop the column `patientDetailsId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_patientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "PatientDetails" DROP CONSTRAINT "PatientDetails_patientId_fkey";

-- DropIndex
DROP INDEX "PatientDetails_patientId_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "patientDetailsId",
ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PatientDetails" ALTER COLUMN "patientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PatientDetails" ADD CONSTRAINT "PatientDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "PatientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
