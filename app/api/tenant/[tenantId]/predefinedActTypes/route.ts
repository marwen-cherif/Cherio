import { auth } from 'auth';
import { getStaffMemberUser } from '../../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../../prisma/prisma';
import {
  Authorization,
  Permissions,
} from '../../../../../lib/ApiHelper/Authorization';

export const GET = auth(async (req, { params }) => {
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

    const isAuthorized = new Authorization(currentUser).canRead(
      Permissions.PREDEFINED_ACTS
    );

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized to create quotation', success: false },
        { status: 401 }
      );
    }

    const predefinedActTypes = await prisma.predefinedActType.findMany({
      where: {
        tenantId: currentUser.staffMember?.tenantId as string,
      },
      include: {
        predefinedActSubTypes: true,
      },
    });

    return Response.json({ value: predefinedActTypes, success: true });
  }

  return Response.json(
    { message: 'Unauthorized to create quotation', success: false },
    { status: 401 }
  );
});

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
      Permissions.PREDEFINED_ACTS
    );

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, price, currency } = body;

    const predefinedActType = await prisma.predefinedActType.create({
      data: {
        name,
        price,
        currency,
        tenant: {
          connect: {
            id: currentUser.staffMember?.tenantId as string,
          },
        },
      },
    });

    return Response.json({ value: predefinedActType, success: true });
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
      Permissions.PREDEFINED_ACTS
    );

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, price, currency, predefinedActTypeId } = body;

    const predefinedActType = await prisma.predefinedActType.update({
      where: {
        id: predefinedActTypeId,
        tenantId: currentUser.staffMember?.tenantId as string,
      },
      data: {
        name,
        price,
        currency,
      },
    });

    return Response.json({ value: predefinedActType, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
