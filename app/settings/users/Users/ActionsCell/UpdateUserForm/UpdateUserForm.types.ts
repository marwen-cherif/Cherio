import { SelectOption } from '../../../../../../components/ui/Select/Select';

export interface UpdateUserFormValue {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: SelectOption;
}
