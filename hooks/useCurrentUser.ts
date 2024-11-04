import { useQuery } from '@tanstack/react-query';
import { Service } from '../lib/ApiClient/Service';

export const GET_USER = 'GET_USER';

export const useCurrentUser = () => {
  const { data: currentUser, isFetching } = useQuery({
    queryKey: [GET_USER],
    queryFn: async () => {
      return await Service.getUser();
    },
    staleTime: Infinity,
  });

  return { currentUser, isFetching };
};
