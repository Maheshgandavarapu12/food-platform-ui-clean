export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  some?: string;
}

export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: UserRole[];
  status: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileImageUrl?: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: Date;
  refreshTokenExpiry: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: UserRole[];
  status: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileImageUrl?: string;
}
export enum UserRole {
  Customer = 'Customer',
  Seller = 'Seller',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}
export enum AccountStatus {
  Pending = 'Pending',
  Active = 'Active',
  Suspended = 'Suspended',
  Deleted = 'Deleted'
}