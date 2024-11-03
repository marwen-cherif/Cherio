import { apiClient } from '@/app/helpers/ApiClient/ApiClientFactory';
import { Role } from '@/prisma/generated/client';
import { Note, PatientDetails } from '../../types/PatientDetails';
import { User } from '../../types/User';

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

  getPatients: async () => {
    return apiClient().get<User[]>('/api/patients');
  },
  createPatient: async (data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => {
    return apiClient().post<
      {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
      },
      User
    >('/api/patients', data);
  },
  deletePatient: async ({ id }: { id: string }) => {
    return apiClient().delete<{ id: string }>(`/api/patients/${id}`);
  },
  updatePatient: async (data: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => {
    return apiClient().put<
      {
        id: string;
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
      },
      User
    >('/api/patients', data);
  },
  getPatient: async ({ id }: { id: string }) => {
    return apiClient().get<PatientDetails>(`/api/patients/${id}`);
  },
  createNote: async ({
    id,
    content,
    files,
  }: {
    id: string;
    content: string;
    files: FileList;
  }) => {
    const formData = new FormData();

    formData.append('content', content);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return apiClient().uploadFile<Note>(
      `/api/patients/${id}/addNote`,
      formData
    );
  },
  getNotes: async ({ id }: { id: string }) => {
    return apiClient().get<Note[]>(`/api/patients/${id}/notes`);
  },
  getPresignedUrl: async ({ id }: { id: string }) => {
    return apiClient().get<string>(`/api/documents/${id}/presignedUrl`);
  },
};
