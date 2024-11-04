import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { getStaffMemberUser } from '../../../../lib/ApiHelper/getUser';

export const DELETE = auth(async (req, { params }) => {
  const staffMemberId = (await params)?.id as string;

  if (req.auth && req.auth.user && req.auth.user.email && staffMemberId) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await prisma.staffMember.delete({
      where: {
        id: staffMemberId,
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
