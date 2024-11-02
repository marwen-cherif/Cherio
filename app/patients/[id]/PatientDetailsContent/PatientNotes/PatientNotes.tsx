import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Table } from '../../../../../components/ui/Table/Table';
import { ColumnDef } from '@tanstack/react-table';
import { Note } from '../../../../types/PatientDetails';
import { FilesCell } from './FilesCell/FilesCell';
import { usePatientNotes } from './PatientNotes.hooks';

interface Props {
  patientId: string;
}

export const PatientNotes: FC<Props> = ({ patientId }) => {
  const t = useTranslations('Patients.Patient.Notes');
  const { notes } = usePatientNotes({ patientId });

  const columns = React.useMemo<ColumnDef<Note>[]>(
    () => [
      {
        accessorKey: 'content',
        header: () => t('content'),
        footer: (props) => props.column.id,
      },
      {
        header: t('files'),
        cell: (props) => <FilesCell files={props.row.original.files} />,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4">{t('title')}</h2>
        </div>
      </div>

      <Table data={notes} columns={columns} />
    </>
  );
};
