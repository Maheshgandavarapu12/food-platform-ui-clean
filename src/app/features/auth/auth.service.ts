import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { AccountStatus, AuthResponse, LoginRequest, User } from '../../core/models/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';
  private isBrowser: boolean;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        if (!response || !response.accessToken) {
          throw new Error('Invalid credentials');
        }
        this.setSessions(response);        
      })
    );
  }

  logout(): Observable<any>{
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    return of(null)
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  isLoggedIn(): boolean{
    return !!this.getSession()

  }

  setSessions(response:AuthResponse){
    if (!this.isBrowser) return;
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
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getSession(): string | null{
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
