import { auth } from 'auth';
import { prisma } from '../../../../prisma/prisma';

export const PUT = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const body = await req.json();
    const { locale } = body;

    const user = await prisma.user.update({
      where: {
        email: req.auth.user.email,
      },
      data: {
        locale: locale?.toLocaleString() ?? 'EN',
      },
    });

    return Response.json({ value: user, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.auth.user.email,
      },
    });

    if (!user) {
      return Response.json(
        {
          message: 'Unauthorized',
          success: false,
          developerMessage: 'User not found',
        },
        { status: 401 }
      );
    }

    return Response.json({ value: user.locale, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
