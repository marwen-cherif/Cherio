import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Service } from '@/app/helpers/ApiClient/Service';
import { toast } from 'react-toastify';
import { GET_PATIENTS } from '../hooks/useGetPatients';
import { addPatientFormSchema } from './AddPatientForm.schema';
import { AddPatientFormValue } from './AddPatientForm.types';

export const useAddPatientForm = ({ onClose }: { onClose: () => void }) => {
  const formContext = useForm<AddPatientFormValue>({
    mode: 'onChange',
    resolver: yupResolver(addPatientFormSchema),
  });
  const { handleSubmit } = formContext;

  const queryClient = useQueryClient();

  const handleSubmitNewUser = handleSubmit(async (data) => {
    await Service.createPatient({
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    await queryClient.invalidateQueries({ queryKey: [GET_PATIENTS] });

    toast.success('User created successfully');

    onClose();
  });

  return {
    formContext,
    handleSubmitNewUser,
  };
};
