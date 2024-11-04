import React, { Suspense } from 'react';
import { Users } from '../../users/Users/Users';
import Skeleton from 'react-loading-skeleton';
import { redirect } from 'next/navigation';

import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import { TenantCreation } from './TenantCreation/TenantCreation';

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold mb-4">Organisation</h1>
      </div>

      <Suspense fallback={<Skeleton count={10} />}>
        <TenantCreation />
      </Suspense>
    </>
  );
}
