'use client';

import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Patients } from './Patients/Patients';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { redirect } from 'next/navigation';

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
        <h1 className="text-3xl font-bold mb-4">Gestion des patients</h1>
      </div>

      <Suspense fallback={<Skeleton count={10} />}>
        <Patients />
      </Suspense>
    </>
  );
}
