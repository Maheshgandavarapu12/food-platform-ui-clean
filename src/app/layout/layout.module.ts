import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    UserLayoutComponent,
    SellerLayoutComponent,
    AdminLayoutComponent,
    SuperAdminLayoutComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BaseLayoutComponent,
    UserLayoutComponent,
    SellerLayoutComponent,
    AdminLayoutComponent,
    SuperAdminLayoutComponent
  ]
})
export class LayoutModule {}
