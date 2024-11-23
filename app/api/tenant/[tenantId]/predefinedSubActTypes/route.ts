import { auth } from 'auth';
import { getStaffMemberUser } from '../../../../../lib/ApiHelper/getUser';
import {
  Authorization,
  Permissions,
} from '../../../../../lib/ApiHelper/Authorization';
import { prisma } from '../../../../../prisma/prisma';

export const POST = auth(async (req, { params }) => {
  const tenantId = (await params).tenantId;

  if (!tenantId) {
    return Response.json(
      { message: 'Tenant ID is required', success: false },
      { status: 400 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    const isAuthorized = new Authorization(currentUser).canCreate(
      Permissions.PREDEFINED_SUB_ACTS
    );

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, predefinedActId, price, currency } = body;

    const predefinedSubActType = await prisma.predefinedActSubTypes.create({
      data: {
        name,
        predefinedActType: {
          connect: {
            id: predefinedActId,
          },
        },
        price,
        currency,
      },
    });

    return Response.json({ value: predefinedSubActType, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});

export const PUT = auth(async (req, { params }) => {
  const tenantId = (await params).tenantId;

  if (!tenantId) {
    return Response.json(
      { message: 'Tenant ID is required', success: false },
      { status: 400 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    const isAuthorized = new Authorization(currentUser).canUpdate(
      Permissions.PREDEFINED_SUB_ACTS
    );

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, predefinedActId, price, currency } = body;

    const predefinedSubActType = await prisma.predefinedActSubTypes.update({
      where: {
        id: predefinedActId,
        predefinedActType: {
          tenantId: currentUser.staffMember?.tenantId as string,
        },
      },
      data: {
        name,
        price,
        currency,
      },
    });

    return Response.json({ value: predefinedSubActType, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
