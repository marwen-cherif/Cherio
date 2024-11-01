import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';

export default async function Index() {
  const session = await auth();

  if (!session?.user) {
    return <div>Unauthorized</div>;
  }

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col gap-6">111</div>
    </SessionProvider>
  );
}
