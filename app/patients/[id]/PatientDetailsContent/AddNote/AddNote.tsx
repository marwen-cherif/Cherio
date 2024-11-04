import React, { FC, useState } from 'react';
import { Button, FileInput, Label, Textarea } from 'flowbite-react';
import { useTranslations } from 'next-intl';
import { Modal } from '../../../../../components/ui/Modal/Modal';
import { useForm } from 'react-hook-form';
import { AddNoteFormValues } from './AddNote.types';
import { Service } from '../../../../../lib/ApiClient/Service';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export const AddNote: FC = () => {
  const t = useTranslations('Patients.Patient');
  const { id } = useParams<{ id: string }>();

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  const formContext = useForm<AddNoteFormValues>();
  const {
    formState: { isSubmitting },
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

    toast.success(t('noteAdded'));

    setIsAddNoteModalOpen(false);
  });

  return (
    <>
      <Button color="light" onClick={() => setIsAddNoteModalOpen(true)}>
        {t('addNote')}
      </Button>

      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        header={t('addNote')}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <div>
              <Label htmlFor="note" value={t('noteLabel')} />
            </div>
            <Textarea {...formContext.register('content')} />
          </div>
          <div className="mb-4">
            <div>
              <Label
                htmlFor="multiple-file-upload"
                value={t('noteFilesLabel')}
              />
            </div>
            <FileInput
              id="multiple-file-upload"
              multiple
              {...formContext.register('files')}
            />
          </div>

          <div className="flex justify-end">
            <Button color="dark" type="submit" isProcessing={isSubmitting}>
              {t('addNote')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
