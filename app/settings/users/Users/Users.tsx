'use client';

import React, { FC, Suspense, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table/Table';
import { Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { Modal } from '@/components/ui/Modal/Modal';
import { AddUserForm } from '@/app/settings/users/Users/AddUserForm/AddUserForm';
import Skeleton from 'react-loading-skeleton';
import { useGetUsers } from '@/app/settings/users/Users/hooks/useGetUsers';
import { ActionsCell } from '@/app/settings/users/Users/ActionsCell/ActionsCell';
import { StaffMember } from '../../../types/StaffMember';

export const Users: FC = () => {
  const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);

  const columns = React.useMemo<ColumnDef<StaffMember>[]>(
    () => [
      {
        accessorKey: 'user.email',
        header: () => 'Email',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'user.phone',
        header: 'Phone',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'user.role',
        header: () => 'Role',
        footer: (props) => props.column.id,
      },
      {
        header: 'Actions',
        cell: (props) => <ActionsCell staffMember={props.row.original} />,
      },
    ],
    []
  );

  const { users } = useGetUsers();

  return (
    <>
      <div className="flex justify-end">
        <Button
          color="dark"
          size="sm"
          className="mb-4"
          onClick={() => setIsAddNewUserModalOpen(true)}
        >
          <FaPlus className="mr-2 h-5 w-5" /> Add User
        </Button>
        <Modal
          isOpen={isAddNewUserModalOpen}
          onClose={() => setIsAddNewUserModalOpen(false)}
          header="Add user"
        >
          <Suspense fallback={<Skeleton />}>
            <AddUserForm
              onClose={() => {
                setIsAddNewUserModalOpen(false);
              }}
            />
          </Suspense>
        </Modal>
      </div>
      <Table data={users} columns={columns} />
    </>
  );
};

Users.displayName = 'DoctorsTable';
