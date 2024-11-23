import { auth } from 'auth';

import { getStaffMemberUser } from '../../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../../prisma/prisma';
import { QuotationStatus } from '../../../../../prisma/generated/client';

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
    const { name, patientDetails, quotationLines } = body;

    // TODO: implement validation with zod

    const newQuotation = await prisma.quotation.create({
      data: {
        name,
        patientDetails,
        status: QuotationStatus.PENDING,
        quotationLines: {
          create: quotationLines.map((line) => {
            return {
              quantity: line.quantity,
              subActTypeId: line.subActTypeId,
              actTypeId: line.actTypeId,
              unitPrice: line.unitPrice,
              currency: line.currency,
              comment: line.comment,
              forecastDate: line.forecastDate,
            };
          }),
        },
      },
    });

    return Response.json({ value: newQuotation, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
