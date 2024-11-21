import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import Calendar from '../components/ui/Calendar/Calendar';

export default async function Index() {
  const session = await auth();

  if (!session?.user) {
    return <div>Unauthorized</div>;
  }

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col gap-6"></div>
    </SessionProvider>
  );
}
