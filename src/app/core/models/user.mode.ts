export enum UserRoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

export type UserRole = `${UserRoles}`

export interface User {
  email: string;
  password: string;
  name: string;
  roles?: UserRole[];
}
