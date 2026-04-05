import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // If not in browser, don't proceed
    if (!this.isBrowser) {
      return false;
    }

    const expectedRoles = route.data['roles'] as UserRole[];
    
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Use hasAnyRole method
    const hasAccess = this.authService.hasAnyRole(expectedRoles);

    if (!hasAccess) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}