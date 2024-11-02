import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@/prisma/generated/client';
import { getCurrentUser } from '../../helpers/ApiHelper/getCurrentUser';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    if (currentUser.role === Role.SUPER_ADMIN) {
      const users = await prisma.user.findMany({
        where: {
          role: {
            not: 'SUPER_ADMIN',
          },
        },
      });

      return Response.json({ value: users, success: true });
    }

    const users = await prisma.user.findMany({
      where: {
        tenantId: currentUser.tenantId,
        role: {
          not: 'SUPER_ADMIN',
        },
      },
    });

    return Response.json({ value: users, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const POST = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, phone, role, firstName, lastName } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        role,
        tenantId: currentUser.tenantId,
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

export const PUT = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getCurrentUser({ email: req.auth.user.email });

    if (!currentUser) {
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
        tenantId: currentUser.tenantId,
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
