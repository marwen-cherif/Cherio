import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@/prisma/generated/client';

export const DELETE = auth(async (req, { params }) => {
  const id = (await params)?.id as string;

  if (req.auth && req.auth.user && req.auth.user.email && id) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: req.auth.user.email,
        role: {
          in: [Role.LEAD_DOCTOR, Role.ADMIN, Role.SUPER_ADMIN],
        },
      },
    });

    if (!user) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return Response.json({ success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
