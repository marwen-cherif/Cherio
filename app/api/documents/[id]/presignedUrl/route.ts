import { auth } from 'auth';
import { getCurrentUser } from '../../../../../lib/ApiHelper/getCurrentUser';
import { prisma } from '../../../../../prisma/prisma';
import { generatePresignedUrl } from '../../../../../lib/FileStorage/generatePresignedUrl';

export const GET = auth(async (req, { params }) => {
  const documentId = (await params)?.id as string;

  if (!documentId) {
    return Response.json(
      { message: 'NotFound', success: false },
      { status: 404 }
    );
  }

  if (req.auth && req.auth.user && req.auth.user.email) {
    const user = await getCurrentUser({ email: req.auth.user.email });

    if (!user) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
        visibleTo: {
          has: user.role,
        },
      },
    });

    if (!document) {
      return Response.json(
        { message: 'NotFound', success: false },
        { status: 404 }
      );
    }

    const presignedUrl = await generatePresignedUrl({ key: document.path });

    return Response.json({ value: presignedUrl, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
