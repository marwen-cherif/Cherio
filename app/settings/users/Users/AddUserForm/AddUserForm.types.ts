import { SelectOption } from '@/components/ui/Select/Select';

export interface AddUserFormValue {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: SelectOption;
}
