import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, UserRole } from '../../core/models/auth.models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
    standalone: false
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isSidebarOpen = true;
  isProfileMenuOpen = false;
  notifications: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'User';
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`;
  }

  isUser(): boolean {
    return this.currentUser?.roles.includes(UserRole.Customer) || false;
  }

  isSeller(): boolean {
    return this.currentUser?.roles.includes(UserRole.Seller) || false;
  }

  isAdmin(): boolean {
    return this.currentUser?.roles.includes(UserRole.Admin) || false;
  }

  isSuperAdmin(): boolean {
    return this.currentUser?.roles.includes(UserRole.SuperAdmin) || false;
  }
}
