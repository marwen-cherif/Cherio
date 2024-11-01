import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@/prisma/generated/client';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
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

    const users = await prisma.user.findMany({
      where: {
        tenantId: user.tenantId,
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

    const body = await req.json();
    const { email, phone, role, firstName, lastName } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        role,
        tenantId: user.tenantId,
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
    const currentUser = await prisma.user.findFirstOrThrow({
      where: {
        email: req.auth.user.email,
        role: {
          in: [Role.LEAD_DOCTOR, Role.ADMIN, Role.SUPER_ADMIN],
        },
      },
    });

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
