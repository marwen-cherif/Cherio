'use client';

import React, { Suspense } from 'react';
import { Users } from '@/app/settings/users/Users/Users';
import Skeleton from 'react-loading-skeleton';
import { redirect } from 'next/navigation';

import { useCurrentUser } from '../../../hooks/useCurrentUser';

export default function Page() {
  const { currentUser, isFetching } = useCurrentUser();

  if (isFetching) {
    return <Skeleton height="35rem" />;
  }

  if (!currentUser?.staffMember?.tenantId) {
    redirect('/settings/tenant/initialize');
  }

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
