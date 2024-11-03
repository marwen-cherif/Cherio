import { useForm } from 'react-hook-form';
import { AddUserFormValue } from '@/app/settings/users/Users/AddUserForm/AddUserForm.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserFormSchema } from '@/app/settings/users/Users/AddUserForm/AddUserForm.schema';
import { useQueryClient } from '@tanstack/react-query';
import { Service } from '../../../../../lib/ApiClient/Service';
import { Role } from '@/prisma/generated/client';
import { GET_USERS } from '@/app/settings/users/Users/hooks/useGetUsers';
import { toast } from 'react-toastify';

export const useAddUserForm = ({ onClose }: { onClose: () => void }) => {
  const formContext = useForm<AddUserFormValue>({
    mode: 'onChange',
    resolver: yupResolver(addUserFormSchema),
  });
  const { handleSubmit } = formContext;

  const queryClient = useQueryClient();

  const handleSubmitNewUser = handleSubmit(async (data) => {
    await Service.createUser({
      email: data.email,
      phone: data.phone,
      role: data.role.value as Role,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    await queryClient.invalidateQueries({ queryKey: [GET_USERS] });

    toast.success('User created successfully');

    onClose();
  });

  return {
    formContext,
    handleSubmitNewUser,
  };
};
