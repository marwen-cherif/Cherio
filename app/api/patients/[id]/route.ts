import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { getStaffMemberUser } from '../../../../lib/ApiHelper/getUser';
import { Role } from '../../../../prisma/generated/client';

export const DELETE = auth(async (req, { params }) => {
  const patientDetailsId = (await params)?.id as string;

  if (req.auth && req.auth.user && req.auth.user.email && patientDetailsId) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await prisma.patientDetails.delete({
      where: {
        id: patientDetailsId,
        tenantId: currentUser.staffMember?.tenantId,
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
  const { id: patientDetailsId } = (await params) as { id: string };

  if (req.auth && req.auth.user && req.auth.user.email && patientDetailsId) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const patient = await prisma.patientDetails.findFirstOrThrow({
      where: {
        id: patientDetailsId,
        tenantId: currentUser.staffMember.tenantId as string,
      },
      include: {
        user: true,
      },
    });

    return Response.json({ success: true, value: patient });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const PUT = auth(async (req, { params }) => {
  const patientDetailsId = (await params)?.id as string;

  if (req.auth && req.auth.user && req.auth.user.email && patientDetailsId) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, phone, firstName, lastName } = body;

    const patientDetails = await prisma.patientDetails.update({
      where: {
        id: patientDetailsId,
        tenantId: currentUser.staffMember.tenantId,
      },
      data: {
        user: {
          update: {
            email,
            phone,
            firstName,
            lastName,
          },
        },
      },
    });

    return Response.json({ value: patientDetails, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
