import { useSuspenseQuery } from '@tanstack/react-query';
import { Service } from '../../../../helpers/ApiClient/Service';

const GET_NOTES = 'GET_NOTES';

export const usePatientNotes = ({ patientId }: { patientId: string }) => {
  const { data: notes } = useSuspenseQuery({
    queryKey: [GET_NOTES, { patientId }],
    queryFn: async () => {
      return await Service.getNotes({ id: patientId });
    },
    staleTime: 10_000,
  });

  return { notes };
};
