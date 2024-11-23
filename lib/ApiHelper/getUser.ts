import { prisma } from '../../prisma/prisma';
import { Role, User } from '../../prisma/generated/client';

export const getStaffMemberUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findFirst({
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

  if (!user?.staffMember || !user.staffMember.tenantId) {
    throw new Error('Staff member does not have a tenant ID');
  }

  return user;
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
