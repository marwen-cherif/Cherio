'use client';

import React, { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Preview from 'react-file-previewer';

import { Service } from '../../../../lib/ApiClient/Service';

const GET_PRESIGNED_URL = 'getPresignedUrl';

interface Props {
  documentId: string;
}

export const DocumentPreview: FC<Props> = ({ documentId }) => {
  const { data: url } = useSuspenseQuery({
    staleTime: Infinity,
    queryKey: [GET_PRESIGNED_URL, { id: documentId }],
    queryFn: async () => {
      return await Service.getPresignedUrl({ id: documentId });
    },
  });

  return (
    <>
      <Preview
        file={{
          url,
        }}
      />
    </>
  );
};
