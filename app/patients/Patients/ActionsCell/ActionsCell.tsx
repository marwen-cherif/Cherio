import React, { FC, useState } from 'react';
import { Button } from 'flowbite-react';
import { User } from '@/prisma/generated/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Service } from '@/app/helpers/ApiClient/Service';
import { toast } from 'react-toastify';
import { Modal } from '../../../../components/ui/Modal/Modal';
import { GET_PATIENTS } from '../hooks/useGetPatients';
import { redirect } from 'next/navigation';

export const ActionsCell: FC<{ user: User }> = ({ user }) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await Service.deleteUser({ id: user.id });

      toast.success('User deleted successfully');

      await queryClient.invalidateQueries({ queryKey: [GET_PATIENTS] });
    },
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  return (
    <div className="flex gap-4">
      <Button
        color="failure"
        size="sm"
        onClick={() => setIsConfirmDeleteModalOpen(true)}
        isProcessing={isPending}
      >
        Delete
      </Button>

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
        color="gray"
        size="sm"
        onClick={() => redirect(`/patients/${user.id}`)}
      >
        Fiche patient
      </Button>
    </div>
  );
};
