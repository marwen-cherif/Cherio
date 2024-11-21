import { Role } from '../prisma/generated/client';

export interface StaffMember {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface UserStaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  staffMember: {
    id: string;
    tenantId: string;
  };
}
