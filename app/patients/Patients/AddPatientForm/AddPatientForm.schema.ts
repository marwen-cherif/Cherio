import * as Yup from 'yup';

export const addPatientFormSchema = Yup.object().shape({
  lastName: Yup.string().required('Lastname is required'),
  firstName: Yup.string().required('FirstName is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
});