'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Service } from '../../../../lib/ApiClient/Service';

export const GET_PATIENTS = 'getPatients';

export const useGetPatients = () => {
  const { data: patients, isLoading } = useQuery({
    initialData: [],
    queryKey: [GET_PATIENTS],
    queryFn: async () => {
      return Service.getPatients();
    },
    placeholderData: keepPreviousData,
  });

  return {
    patients,
    isLoading,
  };
};
