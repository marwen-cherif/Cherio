import { Role, User } from '../../prisma/generated/client';

type ACCESS_RIGHT = 'read' | 'delete' | 'update' | 'create';

export enum Permissions {
  PATIENTS = 'patients',
  STAFF_MEMBERS = 'staff',
  TENANTS = 'tenants',
  OWN_TENANT = 'tenant',
  PREDEFINED_ACTS = 'predefinedActs',
  PREDEFINED_SUB_ACTS = 'predefinedSubActs',
  QUOTATIONS = 'quotations',
  OWN_QUOTATIONS = 'ownQuotations',
  APPOINTMENTS = 'appointments',
  IMPERSONATE_STAFF = 'impersonateStaff',
  IMPERSONATE_PATIENT = 'impersonatePatient',
}

const permissionsMaps: Record<
  Role,
  Partial<Record<Permissions, ACCESS_RIGHT[]>>
> = {
  [Role.PATIENT]: {},
  [Role.DOCTOR]: {},
  [Role.LEAD_DOCTOR]: {
    [Permissions.PATIENTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.STAFF_MEMBERS]: ['read', 'create', 'update', 'delete'],
    [Permissions.OWN_TENANT]: ['read', 'create', 'update', 'delete'],
    [Permissions.PREDEFINED_ACTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.PREDEFINED_SUB_ACTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.QUOTATIONS]: ['read', 'create', 'update', 'delete'],
    [Permissions.APPOINTMENTS]: ['read', 'create', 'update', 'delete'],
  },
  [Role.ADMIN]: {
    [Permissions.PATIENTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.STAFF_MEMBERS]: ['read', 'create', 'update', 'delete'],
    [Permissions.OWN_TENANT]: ['read', 'create', 'update', 'delete'],
    [Permissions.PREDEFINED_ACTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.PREDEFINED_SUB_ACTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.QUOTATIONS]: ['read', 'create', 'update', 'delete'],
    [Permissions.APPOINTMENTS]: ['read', 'create', 'update', 'delete'],
  },
  [Role.SUPER_ADMIN]: {
    [Permissions.PATIENTS]: ['read', 'create', 'update', 'delete'],
    [Permissions.STAFF_MEMBERS]: ['read', 'create', 'update', 'delete'],
    [Permissions.IMPERSONATE_STAFF]: ['read', 'create', 'update', 'delete'],
    [Permissions.IMPERSONATE_PATIENT]: ['read', 'create', 'update', 'delete'],
  },
};

export class Authorization {
  private permissions: Partial<Record<Permissions, ACCESS_RIGHT[]>>;

  constructor(user?: User | null) {
    if (user === null || !user) {
      this.permissions = {};
    } else {
      this.permissions = permissionsMaps[user.role] ?? {};
    }
  }

  canRead(permission: Permissions): boolean {
    const domainPermissions = this.permissions?.[permission] ?? [];

    return domainPermissions.includes('read');
  }

  canCreate(permission: Permissions): boolean {
    const domainPermissions = this.permissions?.[permission] ?? [];

    return domainPermissions.includes('create');
  }

  canDelete(permission: Permissions): boolean {
    const domainPermissions = this.permissions?.[permission] ?? [];

    return domainPermissions.includes('delete');
  }

  canUpdate(permission: Permissions): boolean {
    const domainPermissions = this.permissions?.[permission] ?? [];

    return domainPermissions.includes('update');
  }
}
