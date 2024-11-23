import { prisma } from '../../prisma/prisma';
import { Quotation, Role } from '../../prisma/generated/client';

export const getQuotation = async (id: string) => {
  return prisma.quotation.findUnique({
    where: {
      id,
    },
  });
};

export const isAuthorizedToGenerateQuotation = ({ role }: { role?: Role }) => {
  if (!role) {
    return false;
  }

  return [
    Role.ADMIN.toString(),
    Role.LEAD_DOCTOR.toString(),
    Role.SUPER_ADMIN.toString(),
  ].includes(role);
};

export const isAuthorizedToViewQuotation = ({ role }: { role?: Role }) => {
  if (!role) {
    return false;
  }

  return [
    Role.ADMIN.toString(),
    Role.LEAD_DOCTOR.toString(),
    Role.SUPER_ADMIN.toString(),
  ].includes(role);
};
