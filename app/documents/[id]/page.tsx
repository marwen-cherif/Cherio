import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { DocumentPreview } from './DocumentPreview/DocumentPreview';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<Skeleton height="45rem" />}>
        <DocumentPreview documentId={id} />
      </Suspense>
    </>
  );
}
