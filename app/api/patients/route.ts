import { auth } from 'auth';
import { prisma } from '@/prisma/prisma';
import { PatientDetails, Role } from '@/prisma/generated/client';
import {
  getPatientUserByEmail,
  getStaffMemberUser,
} from '../../../lib/ApiHelper/getUser';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const user = await getStaffMemberUser({ email: req.auth.user.email });

    if (!user || !user.staffMember?.tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const users = await prisma.patientDetails.findMany({
      where: {
        tenantId: user.staffMember.tenantId,
      },
      include: {
        user: true,
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
    const user = await getStaffMemberUser({ email: req.auth.user.email });
    const tenantId = user?.staffMember?.tenantId;

    if (!user || !tenantId) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, phone, firstName, lastName, birthDate } = body;

    if (!email || !phone || !firstName || !lastName || !birthDate) {
      return Response.json(
        { message: 'Missing required fields', success: false },
        { status: 400 }
      );
    }

    const patient = await getPatientUserByEmail({ email });
    const existingPatientDetails = patient?.patientDetails.some(
      (p) => p.tenantId === tenantId
    );

    if (!patient) {
      const newUser = await prisma.user.create({
        data: {
          email,
          phone,
          role: Role.PATIENT,
          firstName,
          lastName,
          birthDate,
          patientDetails: {
            create: [
              {
                tenantId: tenantId,
              },
            ],
          },
        },
        include: {
          patientDetails: true,
        },
      });

      const result = newUser.patientDetails.find(
        (p) => p.tenantId === tenantId
      ) as PatientDetails;

      return Response.json({ value: result, success: true });
    }

    if (existingPatientDetails) {
      await prisma.user.update({
        where: {
          id: patient.id,
        },
        data: {
          phone,
          firstName,
          lastName,
          birthDate,
        },
      });

      return Response.json({ value: existingPatientDetails, success: true });
    }

    const newUser = await prisma.user.update({
      where: {
        id: patient.id,
      },
      data: {
        phone,
        role: Role.PATIENT,
        firstName,
        lastName,
        patientDetails: {
          create: [
            {
              tenantId: tenantId,
            },
          ],
        },
      },
      include: {
        patientDetails: true,
      },
    });

    const result = newUser.patientDetails.find(
      (p) => p.tenantId === tenantId
    ) as PatientDetails;

    return Response.json({ value: result, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
