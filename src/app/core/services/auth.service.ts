import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  UserRole,
  AccountStatus,
  RefreshTokenResponse,
  RefreshTokenRequest
} from '../models/auth.models';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    // Only access localStorage in browser environment
    if (!this.isBrowser) {
      return;
    }

    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (userStr) {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      }
    } catch (e) {
      console.error('Error loading user from localStorage', e);
      this.clearStorage();
    }
  }

  // login(credentials: LoginRequest): Observable<AuthResponse> {
  //   return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, credentials)
  //     .pipe(
  //       map(response => {
  //         if (!response.success || !response.data) {
  //           throw new Error(response.error || 'Login failed');
  //         }
  //         return response.data;
  //       }),
  //       tap(authResponse => this.handleAuthResponse(authResponse)),
  //       catchError(this.handleError)
  //     );
  // }
  login(credentials: LoginRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
    .pipe(
      tap(authResponse => {
        if (!authResponse || !authResponse.accessToken) {
          throw new Error('Login failed');
        }
        this.handleAuthResponse(authResponse);
      }),
      catchError(this.handleError)
    );
}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/register`, request)
      .pipe(
        map(response => {
          if (!response.success || !response.data) {
            throw new Error(response.error || 'Registration failed');
          }
          return response.data;
        }),
        tap(authResponse => this.handleAuthResponse(authResponse)),
        catchError(this.handleError)
      );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();
    
    if (!refreshToken || !accessToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { accessToken, refreshToken };
    
    return this.http.post<ApiResponse<RefreshTokenResponse>>(`${this.baseUrl}/refresh-token`, request)
      .pipe(
        map(response => {
          if (!response.success || !response.data) {
            throw new Error(response.error || 'Token refresh failed');
          }
          return response.data;
        }),
        tap(response => {
          this.setAccessToken(response.accessToken);
        }),
        catchError(error => {
          this.clearStorage();
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    // Only call API if we have a token
    if (this.getAccessToken() && this.isBrowser) {
      return this.http.post<ApiResponse>(`${this.baseUrl}/logout`, {})
        .pipe(
          tap(() => this.clearStorage()),
          catchError(error => {
            this.clearStorage();
            return throwError(() => error);
          })
        );
    }
    
    this.clearStorage();
    return of(null);
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.baseUrl}/forgot-password`, { email })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.error || 'Request failed');
          }
          return { message: response.data?.message || 'Password reset email sent' };
        }),
        catchError(this.handleError)
      );
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.baseUrl}/reset-password`, {
      token, newPassword, confirmPassword
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Password reset failed');
        }
        return { message: response.data?.message || 'Password reset successful' };
      }),
      catchError(this.handleError)
    );
  }

  // Token Management with platform check
  getAccessToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setAccessToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setRefreshToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  private setUser(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.setAccessToken(response.accessToken);
    this.setRefreshToken(response.refreshToken);
    
    const user: User = {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      phoneNumber: response.phoneNumber,
      roles: response.roles,
      status: response.status || AccountStatus.Active,
      emailVerified: response.emailVerified || false,
      phoneVerified: response.phoneVerified || false,
      profileImageUrl: response.profileImageUrl
    };
    
    this.setUser(user);
  }

  private clearStorage(): void {
    if (!this.isBrowser) return;
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  // Helper Methods with platform check
  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!this.getAccessToken() && !!this.currentUserSubject.value;
  }

  // Add this method to the AuthService class
registerSeller(request: RegisterRequest): Observable<AuthResponse> {
  return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/register-seller`, request)
    .pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Seller registration failed');
        }
        return response.data;
      }),
      tap(authResponse => this.handleAuthResponse(authResponse)),
      catchError(this.handleError)
    );
}
  hasRole(role: UserRole | UserRole[]): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    
    const roles = Array.isArray(role) ? role : [role];
    return user.roles.some(userRole => roles.includes(userRole));
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return this.hasRole(roles);
  }

  hasAllRoles(roles: UserRole[]): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    return roles.every(role => user.roles.includes(role));
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isEmailVerified(): boolean {
    return this.currentUserSubject.value?.emailVerified || false;
  }

  isPhoneVerified(): boolean {
    return this.currentUserSubject.value?.phoneVerified || false;
  }

  // getDashboardRoute(): string {
  //   const user = this.currentUserSubject.value;
  //   if (!user) return '/auth/login';
    
  //   if (user.roles.includes(UserRole.SuperAdmin)) return '/super-admin/dashboard';
  //   if (user.roles.includes(UserRole.Admin)) return '/admin/dashboard';
  //   if (user.roles.includes(UserRole.Seller)) return '/seller/dashboard';
  //   return '/user/dashboard';
  // }

  getDashboardRoute(): string {
  const user = this.currentUserSubject.value;
  if (!user) return '/auth/login';

  if (user.roles.includes(UserRole.SuperAdmin)) return '/super-admin/dashboard';
  if (user.roles.includes(UserRole.Admin)) return '/admin/dashboard';
  if (user.roles.includes(UserRole.Seller)) return '/seller/dashboard';
  if (user.roles.includes(UserRole.Customer)) return '/user/dashboard';

  return '/auth/login';
}

  private handleError(error: any): Observable<never> {
    console.error('Auth Service Error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.error) {
      errorMessage = error.error.error;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}