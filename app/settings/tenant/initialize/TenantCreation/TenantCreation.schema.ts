import * as Yup from 'yup';

export const tenantCreationSchema = Yup.object().shape({
  isOwner: Yup.boolean().required('Is owner is required'),
  name: Yup.string().required('Name is required'),
});
