import { prisma } from '../../prisma/prisma';

export const getPatientDetailById = async ({
  patientDetailsId,
  tenantId,
}: {
  patientDetailsId: string;
  tenantId: string;
}) => {
  return prisma.patientDetails.findUnique({
    where: {
      id: patientDetailsId,
      tenantId,
    },
  });
};
