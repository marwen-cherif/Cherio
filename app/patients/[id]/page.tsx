import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { PatientDetailsContent } from './PatientDetailsContent/PatientDetailsContent';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Invalid patient ID</div>;
  }

  return (
    <Suspense
      fallback={
        <>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold mb-4">
              <Skeleton height="3rem" />
            </h1>
          </div>
          <Skeleton count={10} />
        </>
      }
    >
      <PatientDetailsContent id={id} />
    </Suspense>
  );
}
