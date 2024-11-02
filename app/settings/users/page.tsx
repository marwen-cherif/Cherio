import React, { Suspense } from 'react';
import { Users } from '@/app/settings/users/Users/Users';
import Skeleton from 'react-loading-skeleton';

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold mb-4">Liste des membres</h1>
      </div>
      <Suspense fallback={<Skeleton count={10} />}>
        <Users />
      </Suspense>
    </>
  );
}
