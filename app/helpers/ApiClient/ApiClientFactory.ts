import { ApiClient } from '@/app/helpers/ApiClient/ApiClient';

export const apiClient = () => {
  return new ApiClient(process.env.VUE_APP_API_URL || '', {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
};
