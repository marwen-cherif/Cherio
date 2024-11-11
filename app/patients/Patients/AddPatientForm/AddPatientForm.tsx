import React, { FC } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { Button } from 'flowbite-react';

import { useAddPatientForm } from './AddPatientForm.hooks';

interface AddUserFormProps {
  onClose: () => void;
}

export const AddPatientForm: FC<AddUserFormProps> = ({ onClose }) => {
  const { formContext, handleSubmitNewUser } = useAddPatientForm({ onClose });
  const {
    register,
    formState: { isSubmitting, errors },
  } = formContext;

  return (
    <form onSubmit={handleSubmitNewUser} noValidate>
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
    </form>
  );
};
