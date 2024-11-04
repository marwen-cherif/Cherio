import { auth } from 'auth';
import { getStaffMemberUser } from '../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../prisma/prisma';
import { Role } from '../../../../prisma/generated/client';

export const POST = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    if (currentUser.staffMember && currentUser.staffMember.tenantId) {
      return Response.json(
        { message: 'Already initialized', success: false },
        { status: 400 }
      );
    }

    let currentStaffMember = currentUser.staffMember;

    const body = (await req.json()) as { name: string };
    const { name } = body;

    if (!currentStaffMember) {
      const [staffMember] = await prisma.$transaction([
        prisma.staffMember.create({
          data: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
            tenant: {
              create: {
                name,
              },
            },
          },
          include: {
            tenant: true,
          },
        }),
        prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            role: Role.LEAD_DOCTOR,
          },
        }),
      ]);

      return Response.json({ value: staffMember.tenant, success: true });
    }

    const [tenant] = await prisma.$transaction([
      prisma.tenant.create({
        data: {
          name,
          staffMembers: {
            connect: {
              id: currentStaffMember.id,
            },
          },
        },
      }),
      prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          role: Role.LEAD_DOCTOR,
        },
      }),
    ]);

    return Response.json({ value: tenant, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
