import { auth } from 'auth';

import { buildPdfFileResponse } from '../../../../../../lib/Responses/FileResponse';
import { generateQuotationDocument } from '../../../../../../lib/DocumentHelper/generateQuotationDocument';
import { getStaffMemberUser } from '../../../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../../../prisma/prisma';
import {
  getQuotation,
  isAuthorizedToGenerateQuotation,
} from '../../../../../../lib/ApiHelper/quotationHelper';
import { v4 } from 'uuid';
import mime from 'mime-types';
import { documentKeyBuilder } from '../../../../../../lib/FileStorage/documentKeyBuilder';
import { uploadFileToStorage } from '../../../../../../lib/FileStorage/uploadFileToStorage';
import { Role } from '../../../../../../prisma/generated/client';

export const GET = auth(async (req, { params }) => {
  const quotationId = (await params)?.id as string;

  if (!quotationId) {
    return Response.json(
      { message: 'NotFound', success: false },
      { status: 404 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    const isAuthorized = isAuthorizedToGenerateQuotation({
      role: currentUser?.role,
    });

    if (!isAuthorized) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const quotation = await getQuotation(quotationId);

    if (!quotation) {
      return Response.json(
        {
          message: 'NotFound',
          success: false,
          developerMessage: 'Quotation not found',
        },
        { status: 404 }
      );
    }

    const name = `${quotation.name}.pdf`;

    const pdfFile = await generateQuotationDocument({
      quotation,
    });

    const id = v4();
    const fileName = `${id}.pdf`;

    const key = documentKeyBuilder({
      patientDetailsId: quotation.patientDetailsId,
      tenantId: currentUser!.staffMember?.tenantId as string,
      fileName,
    });

    await uploadFileToStorage({ key, file: new File([pdfFile], fileName) });

    await prisma.quotation.update({
      where: {
        id: quotation.id,
      },
      data: {
        document: {
          upsert: {
            create: {
              id,
              path: key,
              name: fileName,
              contentType: 'application/pdf',
              visibleTo: [Role.SUPER_ADMIN, Role.LEAD_DOCTOR, Role.ADMIN],
              createdById: currentUser!.id,
            },
            update: {
              path: key,
              name: fileName,
              contentType: 'application/pdf',
              visibleTo: [Role.SUPER_ADMIN, Role.LEAD_DOCTOR, Role.ADMIN],
              createdById: currentUser!.id,
            },
          },
        },
      },
    });

    return buildPdfFileResponse({ file: pdfFile, name });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
