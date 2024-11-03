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
import { User } from '../../types/User';

export const Patients: FC = () => {
  const [isAddNewPatientModalOpen, setIsAddNewPatientModalOpen] =
    useState(false);

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'email',
        header: () => 'Email',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        footer: (props) => props.column.id,
      },
      {
        header: 'Actions',
        cell: (props) => <ActionsCell user={props.row.original} />,
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
          <FaPlus className="mr-2 h-5 w-5" /> Add Patient
        </Button>

        <Modal
          isOpen={isAddNewPatientModalOpen}
          onClose={() => setIsAddNewPatientModalOpen(false)}
          header="Add Patient"
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
