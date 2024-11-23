import { auth } from 'auth';
import { v4 } from 'uuid';

import { getStaffMemberUser } from '../../../../../lib/ApiHelper/getUser';
import { prisma } from '../../../../../prisma/prisma';
import { Role } from '../../../../../prisma/generated/client';
import { documentKeyBuilder } from '../../../../../lib/FileStorage/documentKeyBuilder';
import { uploadFileToStorage } from '../../../../../lib/FileStorage/uploadFileToStorage';
import mime from 'mime-types';

export const POST = auth(async (req, { params }) => {
  const { id: patientDetailsId } = (await params) as { id: string };

  if (!patientDetailsId) {
    return Response.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

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

    // TODO: implement validation with zod

    const formData = await req.formData();

    const content = formData.get('content') as string;
    const fileList = formData.getAll('files') as File[];

    const files = await Promise.all(
      fileList.map(async (file) => {
        const id = v4();
        const fileName = `${id}.${mime.extension(file.type)}`;

        const key = documentKeyBuilder({
          patientDetailsId,
          tenantId: currentUser.staffMember?.tenantId as string,
          fileName,
        });

        await uploadFileToStorage({ key, file });

        return {
          id,
          path: key,
          name: file.name,
          contentType: file.type,
          visibleTo: [
            Role.DOCTOR,
            Role.SUPER_ADMIN,
            Role.LEAD_DOCTOR,
            Role.ADMIN,
          ],
          createdById: currentUser.id,
        };
      })
    );

    const newUser = await prisma.note.create({
      data: {
        createdById: currentUser.id,
        content,
        patientDetailsId,
        files: {
          create: files,
        },
      },
    });

    return Response.json({ value: newUser, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
