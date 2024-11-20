import React, { FC } from 'react';
import { Select } from '@/components/ui/Select/Select';
import { Input } from '@/components/ui/Input/Input';
import { Button } from 'flowbite-react';
import { Role } from '@/prisma/generated/client';

import { useAddUserForm } from '@/app/settings/users/Users/AddUserForm/AddUserForm.hooks';
import { Form } from '../../../../../components/ui/Form/Form';

interface AddUserFormProps {
  onClose: () => void;
}

export const AddUserForm: FC<AddUserFormProps> = ({ onClose }) => {
  const { formContext, handleSubmitNewUser } = useAddUserForm({ onClose });
  const {
    register,
    formState: { isSubmitting, errors },
  } = formContext;

  return (
    <Form onSubmit={handleSubmitNewUser}>
      <Select
        name="role"
        options={[
          { value: '', label: 'Select role' },
          { value: Role.ADMIN, label: 'Admin' },
          { value: Role.DOCTOR, label: 'Doctor' },
        ]}
        label="Role"
        isRequired
        control={formContext.control}
      />
      <div className="flex gap-4 w-full">
        <Input
          {...register('firstName')}
          label="First name"
          isRequired
          errors={errors}
        />
        <Input
          {...register('lastName')}
          label="Last name"
          isRequired
          errors={errors}
        />
      </div>
      <Input {...register('email')} label="Email" isRequired errors={errors} />
      <Input {...register('phone')} label="Phone" isRequired errors={errors} />

      <div className="flex justify-end">
        <Button color="dark" type="submit" isProcessing={isSubmitting}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
