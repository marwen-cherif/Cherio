import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { getStaffMemberUser } from '../../../lib/ApiHelper/getUser';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser || !currentUser.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const staffMembers = await prisma.staffMember.findMany({
      where: {
        tenantId: currentUser.staffMember.tenantId,
      },
      include: {
        user: true,
      },
    });

    return Response.json({ value: staffMembers, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const POST = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
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
    const { email, phone, role, firstName, lastName } = body;

    const existingUser = await getStaffMemberUser({ email });

    if (existingUser && existingUser.staffMember) {
      const newStaffMember = await prisma.staffMember.update({
        where: {
          id: existingUser.staffMember.id,
        },
        data: {
          tenantId: currentUser.staffMember.tenantId,
        },
      });

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          phone,
          role,
          firstName,
          lastName,
        },
      });

      return Response.json({ value: newStaffMember, success: true });
    }

    if (existingUser && !existingUser.staffMember) {
      const newStaffMember = await prisma.staffMember.create({
        data: {
          id: existingUser.id,
          tenantId: currentUser.staffMember.tenantId,
        },
      });

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          phone,
          role,
          firstName,
          lastName,
        },
      });

      return Response.json({ value: newStaffMember, success: true });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        role,
        firstName,
        lastName,
        staffMember: {
          create: {
            tenantId: currentUser.staffMember.tenantId,
          },
        },
      },
      include: {
        staffMember: true,
      },
    });

    return Response.json({ value: newUser.staffMember, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const PUT = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
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
    const { id, email, phone, role, firstName, lastName } = body;

    const newUser = await prisma.user.update({
      where: {
        id,
        staffMember: {
          tenantId: currentUser.staffMember.tenantId,
        },
      },
      data: {
        email,
        phone,
        role,
        firstName,
        lastName,
      },
    });

    return Response.json({ value: newUser, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
