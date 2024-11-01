'use client';

import React, { FC, Suspense, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Role, User } from '@/prisma/generated/client';
import { Table } from '@/components/ui/Table/Table';
import { Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { Modal } from '@/components/ui/Modal/Modal';
import { AddUserForm } from '@/app/settings/users/Users/AddUserForm/AddUserForm';
import Skeleton from 'react-loading-skeleton';
import { useGetUsers } from '@/app/settings/users/Users/hooks/useGetUsers';
import { ActionsCell } from '@/app/settings/users/Users/ActionsCell/ActionsCell';
import { prisma } from '../../../../prisma/prisma';
import { GetServerSideProps } from 'next';
/*
export async function getServerSideProps(context) {}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.auth && req.auth.user && req.auth.user.email) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: req.auth.user.email,
        role: {
          in: [Role.LEAD_DOCTOR, Role.ADMIN, Role.SUPER_ADMIN],
        },
      },
    });

    if (!user) {
      return Response.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        tenantId: user.tenantId,
        role: {
          not: 'SUPER_ADMIN',
        },
      },
    });

    return Response.json({ value: users, success: true });
  }

  return Response.json(
    { message: 'Unauthorized', success: false },
    { status: 401 }
  );

  return {
    props: {
      users,
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};*/

export const Users: FC = () => {
  const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);

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
        accessorKey: 'role',
        header: () => 'Role',
        footer: (props) => props.column.id,
      },
      {
        header: 'Actions',
        cell: (props) => <ActionsCell user={props.row.original} />,
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
