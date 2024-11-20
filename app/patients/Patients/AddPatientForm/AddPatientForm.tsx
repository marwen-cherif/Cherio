import React, { FC } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { Button } from 'flowbite-react';

import { useAddPatientForm } from './AddPatientForm.hooks';
import { useTranslations } from 'next-intl';
import { Form } from '../../../../components/ui/Form/Form';
import { Datepicker } from '../../../../components/ui/Datepicker/Datepicker';
import { Controller } from 'react-hook-form';

interface AddUserFormProps {
  onClose: () => void;
}

export const AddPatientForm: FC<AddUserFormProps> = ({ onClose }) => {
  const patientMessages = useTranslations('patients.patient');
  const generalMessages = useTranslations('general');
  const { formContext, handleSubmitNewUser } = useAddPatientForm({ onClose });
  const {
    register,
    formState: { isSubmitting, errors },
    control,
    watch,
  } = formContext;

  return (
    <Form onSubmit={handleSubmitNewUser} className="min-h-20">
      <Controller
        render={({ field }) => {
          return (
            <Datepicker
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={patientMessages('birthDate')}
              errors={errors}
              isRequired
            />
          );
        }}
        name="birthDate"
        control={control}
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
          {generalMessages('add')}
        </Button>
      </div>
    </Form>
  );
};
