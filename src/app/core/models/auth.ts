export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  some?: string;
}