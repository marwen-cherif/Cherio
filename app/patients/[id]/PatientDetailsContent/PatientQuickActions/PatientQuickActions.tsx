import React, { FC, useState } from 'react';
import { TakeAppointmentForm } from './TakeAppointmentForm/TakeAppointmentForm';
import { Modal } from '../../../../../components/ui/Modal/Modal';
import { AddNoteForm } from './AddNoteForm/AddNoteForm';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { DropdownButton } from '../../../../../components/ui/DropdownButton/DropdownButton';

export const PatientQuickActions: FC = () => {
  const patientDetailsMessages = useTranslations('patients.patient');
  const general = useTranslations('general');
  const { id: patientDetailsId } = useParams<{ id: string }>();

  const [isTakeAppointmentModalOpen, setIsTakeAppointmentModalOpen] =
    useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  return (
    <>
      <DropdownButton
        label={general('actions')}
        menuItems={[
          {
            label: patientDetailsMessages('notes.addNote.button'),
            onClick: () => setIsAddNoteModalOpen(true),
          },
          {
            label: patientDetailsMessages('takeAppointment.button'),
            onClick: () => setIsTakeAppointmentModalOpen(true),
          },
        ]}
      />

      <Modal
        isOpen={isTakeAppointmentModalOpen}
        onClose={() => setIsTakeAppointmentModalOpen(false)}
        header={patientDetailsMessages('takeAppointment.title')}
        size="8xl"
      >
        <TakeAppointmentForm
          patientDetailsId={patientDetailsId}
          onSubmitSuccess={() => {
            setIsTakeAppointmentModalOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        header={patientDetailsMessages('notes.addNote.title')}
        size="3xl"
      >
        <AddNoteForm
          id={patientDetailsId}
          onSubmitSuccess={() => setIsAddNoteModalOpen(false)}
        />
      </Modal>
    </>
  );
};
