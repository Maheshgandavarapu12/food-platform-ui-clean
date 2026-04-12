import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  if(req.url.includes('/auth/login') || 
        req.url.includes('/auth/register') || 
        req.url.includes('/auth/forgot-password') ||
        req.url.includes('/auth/reset-password')) {
    return next(req);
  }
  const token = authService.getAccessToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
