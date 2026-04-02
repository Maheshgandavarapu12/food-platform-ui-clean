export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  gender?: Gender;
  dateOfBirth?: string;
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

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiry: Date;
}

// export enum UserRole {
//   User = 'User',
//   Seller = 'Seller',
//   Admin = 'Admin',
//   SuperAdmin = 'SuperAdmin'
// }

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

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  PreferNotToSay = 'PreferNotToSay'
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