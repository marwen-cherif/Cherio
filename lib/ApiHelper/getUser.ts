import { prisma } from '../../prisma/prisma';
import { Role } from '../../prisma/generated/client';

export const getStaffMemberUser = async ({ email }: { email: string }) => {
  return prisma.user.findFirst({
    where: {
      email: email,
      role: {
        in: [Role.DOCTOR, Role.LEAD_DOCTOR, Role.ADMIN, Role.SUPER_ADMIN],
      },
    },
    include: {
      staffMember: true,
    },
  });
};

export const getPatientUserByEmail = async ({ email }: { email: string }) => {
  return prisma.user.findFirst({
    where: {
      email: email,
      role: Role.PATIENT,
    },
    include: {
      patientDetails: true,
    },
  });
};
