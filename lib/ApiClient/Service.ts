import { apiClient } from './ApiClientFactory';
import { Role } from '../../prisma/generated/client';
import { Note, PatientDetails } from '../../app/types/PatientDetails';
import { User } from '../../app/types/User';
import { StaffMember, UserStaffMember } from '../../app/types/StaffMember';
import { Tenant } from '../../app/types/Tenant';

export const Service = {
  getStaffMembers: async () => {
    return apiClient().get<never, StaffMember[]>('/api/staffMembers');
  },
  createStaffMember: async (data: {
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
      Omit<StaffMember, 'user'>
    >('/api/staffMembers', data);
  },
  deleteStaffMember: async ({ id }: { id: string }) => {
    return apiClient().delete<{ id: string }>(`/api/staffMembers/${id}`);
  },
  updateStaffMember: async (data: {
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
      Omit<StaffMember, 'user'>
    >('/api/staffMembers', data);
  },

  getPatients: async () => {
    return apiClient().get<never, PatientDetails[]>('/api/patients');
  },
  createPatient: async (data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    birthDate: string;
  }) => {
    return apiClient().post<
      {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        birthDate: string;
      },
      PatientDetails
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
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
      },
      User
    >(`/api/patients/${data.id}`, {
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  },
  getPatient: async ({ id }: { id: string }) => {
    return apiClient().get<never, PatientDetails>(`/api/patients/${id}`);
  },
  createNote: async ({
    id,
    content,
    files,
  }: {
    id: string;
    content: string;
    files?: FileList;
  }) => {
    const formData = new FormData();

    formData.append('content', content);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    return apiClient().uploadFile<Note>(
      `/api/patients/${id}/addNote`,
      formData
    );
  },
  getNotes: async ({ id }: { id: string }) => {
    return apiClient().get<never, Note[]>(`/api/patients/${id}/notes`);
  },
  getPresignedUrl: async ({ id }: { id: string }) => {
    return apiClient().get<never, string>(`/api/documents/${id}/presignedUrl`);
  },

  getUser: async () => {
    return apiClient().get<never, User>('/api/user');
  },
  updateUserLocale: async ({ locale }: { locale: string }) => {
    return apiClient().put<{ locale: string }, User>('/api/user/locale', {
      locale,
    });
  },

  initializeTenant: async ({ name }: { name: string }) => {
    return apiClient().post<{ name: string }, Tenant>(
      '/api/tenant/initialize',
      {
        name,
      }
    );
  },

  takeAppointment: async ({
    staffMemberId,
    endDate,
    startDate,
  }: {
    staffMemberId: string;
    startDate: Date;
    endDate: Date;
  }) => {
    return apiClient().post<{
      staffMemberId: string;
      endDate: Date;
      startDate: Date;
    }>('api/appointments', {
      staffMemberId,
      startDate,
      endDate,
    });
  },
};
