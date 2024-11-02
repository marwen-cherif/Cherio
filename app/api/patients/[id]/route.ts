import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@/prisma/generated/client';
import { getCurrentUser } from '../../../helpers/ApiHelper/getCurrentUser';

export const DELETE = auth(async (req, { params }) => {
  const id = (await params)?.id as string;

  if (req.auth && req.auth.user && req.auth.user.email && id) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await prisma.user.delete({
      where: {
        id,
        role: Role.PATIENT,
      },
    });

    return Response.json({ success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const GET = auth(async (req, { params }) => {
  const { id } = (await params) as { id: string };

  if (req.auth && req.auth.user && req.auth.user.email && id) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const patient = await prisma.user.findFirstOrThrow({
      where: {
        id,
        role: Role.PATIENT,
      },
      include: {
        patientDetails: true,
      },
    });

    return Response.json({ success: true, value: patient });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
