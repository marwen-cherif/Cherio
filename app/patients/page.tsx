import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Patients } from './Patients/Patients';

export default function Page() {
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
