import { StaffMember } from '../../../../../../types/StaffMember';
import { SelectOption } from '../../../../../../components/ui/Select/Select';

export interface TakeAppointmentFormValues {
  staffMember: SelectOption<StaffMember>;
  startDate: Date;
  endDate: Date;
}
