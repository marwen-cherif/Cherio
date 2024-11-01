import { apiClient } from '@/app/helpers/ApiClient/ApiClientFactory';
import { Role, User } from '@/prisma/generated/client';

export const Service = {
  getUsers: async () => {
    return apiClient().get<User[]>('/api/users');
  },
  createUser: async (data: {
    email: string;
    phone: string;
    role: Role;
    firstName: string;
    lastName: string;
  }) => {
    return apiClient().post<
      {
        email: string;
        phone: string;
        role: Role;
        firstName: string;
        lastName: string;
      },
      User
    >('/api/users', data);
  },
  deleteUser: async ({ id }: { id: string }) => {
    return apiClient().delete<{ id: string }>(`/api/users/${id}`);
  },
  updateUser: async (data: {
    id: string;
    email: string;
    phone: string;
    role: Role;
    firstName: string;
    lastName: string;
  }) => {
    return apiClient().put<
      {
        id: string;
        email: string;
        phone: string;
        role: Role;
        firstName: string;
        lastName: string;
      },
      User
    >('/api/users', data);
  },
};
