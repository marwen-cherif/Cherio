import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Service } from '../../../../../../lib/ApiClient/Service';
import { Role } from '../../../../../../prisma/generated/client';
import { GET_USERS } from '../../hooks/useGetUsers';
import { toast } from 'react-toastify';

import { UpdateUserFormValue } from './UpdateUserForm.types';
import { updateUserFormSchema } from './UpdateUserForm.schema';
import { User } from '../../../../../../types/User';
import { StaffMember } from '../../../../../../types/StaffMember';

export const useUpdateUserForm = ({
  onClose,
  staffMember,
}: {
  staffMember: StaffMember;
  onClose: () => void;
}) => {
  const user = staffMember.user;

  const formContext = useForm<UpdateUserFormValue>({
    mode: 'onChange',
    resolver: yupResolver(updateUserFormSchema),
    defaultValues: {
      id: staffMember.id,
      email: user.email,
      phone: user.phone,
      role: user.role
        ? {
            value: user.role,
            label: user.role,
          }
        : undefined,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const { handleSubmit } = formContext;

  const queryClient = useQueryClient();

  const handleSubmitNewUser = handleSubmit(async (data) => {
    await Service.updateStaffMember({
      id: data.id,
      email: data.email,
      phone: data.phone,
      role: data.role.value as Role,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    await queryClient.invalidateQueries({ queryKey: [GET_USERS] });

    toast.success('User updated successfully');

    onClose();
  });

  return {
    formContext,
    handleSubmitNewUser,
  };
};
