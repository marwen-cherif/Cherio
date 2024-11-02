import React, { FC, Suspense, useState } from 'react';
import { Button } from 'flowbite-react';
import { User } from '@/prisma/generated/client';
import { useMutation } from '@tanstack/react-query';
import { Service } from '@/app/helpers/ApiClient/Service';
import { toast } from 'react-toastify';
import { Modal } from '../../../../../components/ui/Modal/Modal';
import Skeleton from 'react-loading-skeleton';
import { UpdateUserForm } from './UpdateUserForm/UpdateUserForm';

export const ActionsCell: FC<{ user: User }> = ({ user }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await Service.deleteUser({ id: user.id });

      toast.success('User deleted successfully');
    },
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <Button
        color="dark"
        size="sm"
        onClick={() => setIsUpdateUserModalOpen(true)}
      >
        Edit
      </Button>

      <Modal
        isOpen={isUpdateUserModalOpen}
        onClose={() => setIsUpdateUserModalOpen(false)}
        header="Update user"
      >
        <Suspense fallback={<Skeleton />}>
          <UpdateUserForm
            user={user}
            onClose={() => {
              setIsUpdateUserModalOpen(false);
            }}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        header="Patient will be deleted permently from the system"
      >
        <div className="flex justify-end gap-4">
          <Button
            color="dark"
            size="sm"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="failure"
            size="sm"
            onClick={async () => {
              await mutateAsync();

              setIsConfirmDeleteModalOpen(false);
            }}
            isProcessing={isPending}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Button
        color="failure"
        size="sm"
        onClick={() => setIsConfirmDeleteModalOpen(true)}
        isProcessing={isPending}
      >
        Delete
      </Button>
    </div>
  );
};
