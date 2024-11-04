import React, { FC, useState } from 'react';
import { Button } from 'flowbite-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Service } from '../../../../lib/ApiClient/Service';
import { toast } from 'react-toastify';
import { Modal } from '../../../../components/ui/Modal/Modal';
import { GET_PATIENTS } from '../hooks/useGetPatients';
import { redirect } from 'next/navigation';
import { User } from '../../../types/User';
import { PatientDetails } from '../../../types/PatientDetails';

export const ActionsCell: FC<{ patient: PatientDetails }> = ({ patient }) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await Service.deletePatient({ id: patient.id });

      toast.success('Patient deleted successfully');

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
        onClick={() => redirect(`/patients/${patient.id}`)}
      >
        Fiche patient
      </Button>
    </div>
  );
};
