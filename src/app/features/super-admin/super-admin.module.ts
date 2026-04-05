import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './dashboard/super-admin-dashboard.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [SuperAdminDashboardComponent],
  imports: [CommonModule, SuperAdminRoutingModule, LayoutModule]
})
export class SuperAdminModule { }
