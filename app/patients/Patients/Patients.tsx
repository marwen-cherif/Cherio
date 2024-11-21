'use client';

import React, { FC, Suspense, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table/Table';
import { Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { Modal } from '@/components/ui/Modal/Modal';
import { AddPatientForm } from './AddPatientForm/AddPatientForm';
import Skeleton from 'react-loading-skeleton';
import { ActionsCell } from './ActionsCell/ActionsCell';
import { useGetPatients } from './hooks/useGetPatients';
import { PatientDetails } from '../../../types/PatientDetails';
import { useTranslations } from 'next-intl';

export const Patients: FC = () => {
  const generalMessages = useTranslations('general');
  const patientMessages = useTranslations('patients.patient');
  const [isAddNewPatientModalOpen, setIsAddNewPatientModalOpen] =
    useState(false);

  const columns = React.useMemo<ColumnDef<PatientDetails>[]>(
    () => [
      {
        accessorKey: 'user.email',
        header: () => generalMessages('email'),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'user.phone',
        header: generalMessages('phone'),
        footer: (props) => props.column.id,
      },
      {
        header: generalMessages('actions'),
        cell: (props) => <ActionsCell patient={props.row.original} />,
      },
    ],
    []
  );

  const { patients, isLoading } = useGetPatients();

  if (isLoading) {
    return <Skeleton count={10} height="3rem" />;
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          color="dark"
          size="sm"
          className="mb-4"
          onClick={() => setIsAddNewPatientModalOpen(true)}
        >
          <FaPlus className="mr-2 h-5 w-5" />{' '}
          {patientMessages('addPatient.button')}
        </Button>

        <Modal
          isOpen={isAddNewPatientModalOpen}
          onClose={() => setIsAddNewPatientModalOpen(false)}
          header={patientMessages('addPatient.title')}
          size="4xl"
        >
          <Suspense fallback={<Skeleton />}>
            <AddPatientForm
              onClose={() => {
                setIsAddNewPatientModalOpen(false);
              }}
            />
          </Suspense>
        </Modal>
      </div>

      <Table data={patients} columns={columns} />
    </>
  );
};
