import { auth } from 'auth';
import { getCurrentUser } from '../../../../../lib/ApiHelper/getCurrentUser';
import { prisma } from '../../../../../prisma/prisma';

export const GET = auth(async (req, { params }) => {
  const { id: patientId } = (await params) as { id: string };

  if (!patientId) {
    return Response.json(
      { message: 'Bad Request', success: false },
      { status: 400 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser || !currentUser.tenantId) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const patient = await prisma.user.findFirstOrThrow({
      where: {
        id: patientId,
        tenantId: currentUser.tenantId,
      },
    });

    if (!patient) {
      return Response.json(
        { message: 'Patient not found', success: false },
        { status: 404 }
      );
    }

    const notes = await prisma.note.findMany({
      where: {
        patientId,
      },
      include: {
        files: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return Response.json({ value: notes, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
