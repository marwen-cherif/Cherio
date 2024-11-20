import React, { FC } from 'react';
import { Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { Service } from '../../../../../../lib/ApiClient/Service';
import { AddNoteFormValues } from './AddNoteForm.types';
import { addNoteFormSchema } from './AddNoteForm.schema';
import { Textarea } from '../../../../../../components/ui/Textarea/Textarea';
import { FileInput } from '../../../../../../components/ui/FileInput/FileInput';
import { ButtonContainer } from '../../../../../../components/ui/ButtonContainer/ButtonContainer';
import { Form } from '../../../../../../components/ui/Form/Form';

interface AddNoteFormProps {
  id: string;
  onSubmitSuccess: () => void;
}

export const AddNoteForm: FC<AddNoteFormProps> = ({ id, onSubmitSuccess }) => {
  const t = useTranslations('patients.patient.notes.addNote');
  const general = useTranslations('general');

  const formContext = useForm<AddNoteFormValues>({
    resolver: yupResolver(addNoteFormSchema),
  });
  const {
    formState: { isSubmitting, errors },
  } = formContext;

  const handleSubmit = formContext.handleSubmit(async ({ content, files }) => {
    if (!id) {
      return;
    }

    await Service.createNote({
      content,
      files,
      id,
    });

    toast.success(t('success'));

    onSubmitSuccess();
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        label={t('content')}
        {...formContext.register('content')}
        errors={errors}
      />

      <FileInput
        label={t('files')}
        {...formContext.register('files')}
        errors={errors}
        isMultiple
      />

      <ButtonContainer>
        <Button color="dark" type="submit" isProcessing={isSubmitting}>
          {general('submit')}
        </Button>
      </ButtonContainer>
    </Form>
  );
};
