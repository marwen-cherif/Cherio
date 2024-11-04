import { useSuspenseQuery } from '@tanstack/react-query';
import { Service } from '../../../../lib/ApiClient/Service';

export const usePatientDetailsContent = ({ id }: { id: string }) => {
  const { data: patient } = useSuspenseQuery({
    queryKey: ['getPatientDetails'],
    queryFn: async () => {
      return Service.getPatient({ id });
    },
    staleTime: 1_000,
  });

  return {
    patient,
  };
};
