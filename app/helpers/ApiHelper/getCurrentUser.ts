import { prisma } from '../../../prisma/prisma';
import { Role } from '../../../prisma/generated/client';

export const getCurrentUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
      role: {
        in: [Role.LEAD_DOCTOR, Role.ADMIN, Role.SUPER_ADMIN],
      },
    },
  });

  return user;
};
