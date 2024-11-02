import React, { FC } from 'react';
import { Document } from '../../../../../types/PatientDetails';
import CustomLink from '../../../../../../components/custom-link';

interface Props {
  files: Document[];
}

export const FilesCell: FC<Props> = ({ files }) => {
  return (
    <>
      {files?.map((file) => {
        return (
          <div>
            <CustomLink
              target="_blank"
              className="font-medium text-blue-600 dark:text-blue-100 hover:underline"
              href={`/documents/${file.id}`}
            >
              {file.name}
            </CustomLink>
          </div>
        );
      })}
    </>
  );
};
