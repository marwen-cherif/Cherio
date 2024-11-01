import * as Yup from 'yup';

export const updateUserFormSchema = Yup.object().shape({
  id: Yup.string().required('Id is required'),
  lastName: Yup.string().required('Lastname is required'),
  firstName: Yup.string().required('FirstName is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }).test('Role is required', 'Role is required', (option) => {
    return !!option?.value;
  }),
  phone: Yup.string().required('Phone is required'),
});
