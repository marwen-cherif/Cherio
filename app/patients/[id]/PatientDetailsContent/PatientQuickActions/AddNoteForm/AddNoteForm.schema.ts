import * as yup from 'yup';

export const addNoteFormSchema = yup.object().shape({
  content: yup.string().required('Note is required'),
  files: yup.mixed(),
});
