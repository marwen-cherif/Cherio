import { auth } from 'auth';
import { getStaffMemberUser } from '../../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../../prisma/prisma';

export const GET = auth(async (req, { params }) => {
  const { id: patientDetailsId } = (await params) as { id: string };

  if (!patientDetailsId) {
    return Response.json(
      { message: 'Bad Request', success: false },
      { status: 400 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const patient = await prisma.patientDetails.findFirstOrThrow({
      where: {
        id: patientDetailsId,
        tenantId: currentUser.staffMember.tenantId as string,
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
        patientDetailsId,
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
