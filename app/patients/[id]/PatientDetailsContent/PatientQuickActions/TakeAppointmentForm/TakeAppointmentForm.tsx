import React, { FC } from 'react';
import { Button, FileInput, Label, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { AddNoteFormValues } from '../AddNoteForm/AddNoteForm.types';
import { Service } from '../../../../../../lib/ApiClient/Service';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { TakeAppointmentFormValues } from './TakeAppointmentForm.types';
import Calendar from '../../../../../../components/ui/Calendar/Calendar';
import { Form } from '../../../../../../components/ui/Form/Form';

interface TakeAppointmentFormProps {
  patientDetailsId: string;
  onSubmitSuccess: () => void;
}

export const TakeAppointmentForm: FC<TakeAppointmentFormProps> = ({
  patientDetailsId,
  onSubmitSuccess,
}) => {
  const t = useTranslations('patients.patient.takeAppointment');

  const formContext = useForm<TakeAppointmentFormValues>();
  const {
    formState: { isSubmitting },
  } = formContext;

  const handleSubmit = formContext.handleSubmit(
    async ({ staffMember, endDate, startDate }) => {
      if (!patientDetailsId) {
        return;
      }

      await Service.takeAppointment({
        staffMemberId: staffMember.value,
        endDate,
        startDate,
      });

      toast.success(t('success'));

      onSubmitSuccess();
    }
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Calendar />

      <div className="flex justify-end">
        <Button color="dark" type="submit" isProcessing={isSubmitting}>
          {t('submit')}
        </Button>
      </div>
    </Form>
  );
};
