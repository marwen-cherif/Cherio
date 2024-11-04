import { auth } from 'auth';
import { getStaffMemberUser } from '../../../lib/ApiHelper/getUser';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const currentUser = await getStaffMemberUser({
      email: req.auth.user.email,
    });

    if (!currentUser) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    return Response.json({ value: currentUser, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );
});
