import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Service } from '../../../../lib/ApiClient/Service';
import { toast } from 'react-toastify';
import { GET_PATIENTS } from '../hooks/useGetPatients';
import { addPatientFormSchema } from './AddPatientForm.schema';
import { AddPatientFormValue } from './AddPatientForm.types';
import { useTranslations } from 'next-intl';
import { dateToLocalISO } from '../../../../lib/helpers/dateToLocaleIso';

export const useAddPatientForm = ({ onClose }: { onClose: () => void }) => {
  const formContext = useForm<AddPatientFormValue>({
    mode: 'onChange',
    resolver: yupResolver(addPatientFormSchema),
  });
  const addPatientMessages = useTranslations('patients.addPatient');
  const { handleSubmit } = formContext;

  const queryClient = useQueryClient();

  const handleSubmitNewUser = handleSubmit(async (data) => {
    try {
      await Service.createPatient({
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: dateToLocalISO(data.birthDate),
      });
    } catch (error) {
      toast.error('Failed to create patient.');

      return;
    }

    await queryClient.invalidateQueries({ queryKey: [GET_PATIENTS] });

    toast.success(addPatientMessages('success'));

    onClose();
  });

  return {
    formContext,
    handleSubmitNewUser,
  };
};
