import { Role } from '../prisma/generated/client';

export interface PatientDetails {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    birthDate: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  path: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  files: Document[];
}
