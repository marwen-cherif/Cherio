import React, { FC, useState } from 'react';
import { Button } from 'flowbite-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Service } from '../../../../lib/ApiClient/Service';
import { toast } from 'react-toastify';
import { Modal } from '../../../../components/ui/Modal/Modal';
import { GET_PATIENTS } from '../hooks/useGetPatients';
import { redirect } from 'next/navigation';
import { PatientDetails } from '../../../../types/PatientDetails';
import { useTranslations } from 'next-intl';
import { ButtonContainer } from '../../../../components/ui/ButtonContainer/ButtonContainer';

export const ActionsCell: FC<{ patient: PatientDetails }> = ({ patient }) => {
  const queryClient = useQueryClient();
  const generalMessages = useTranslations('general');
  const deletePatientsMessages = useTranslations('patients.deletePatient');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await Service.deletePatient({ id: patient.id });

      toast.success(deletePatientsMessages('success'));

      await queryClient.invalidateQueries({ queryKey: [GET_PATIENTS] });
    },
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  return (
    <div className="flex gap-4">
      <ButtonContainer>
        <Button
          color="gray"
          size="sm"
          onClick={() => redirect(`/patients/${patient.id}`)}
        >
          {generalMessages('view')}
        </Button>

        <Button
          color="failure"
          size="sm"
          onClick={() => setIsConfirmDeleteModalOpen(true)}
          isProcessing={isPending}
        >
          {generalMessages('delete')}
        </Button>
      </ButtonContainer>

      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        header={deletePatientsMessages('title')}
      >
        <div className="flex justify-end gap-4">
          <Button
            color="dark"
            size="sm"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          >
            {generalMessages('cancel')}
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
            {generalMessages('confirm')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
