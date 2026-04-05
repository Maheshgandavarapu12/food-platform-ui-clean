import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from '../../layout/super-admin-layout/super-admin-layout.component';
import { SuperAdminDashboardComponent } from './dashboard/super-admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent }
      // { path: 'users' }, // TODO: Create users management
      // { path: 'admins' }, // TODO: Create admins management
      // { path: 'sellers' }, // TODO: Create sellers management
      // { path: 'analytics'}, // TODO: Create analytics component
      // { path: 'payments' }, // TODO: Create payments management
      // { path: 'system'}, // TODO: Create system settings
      // { path: 'settings'} // TODO: Create settings component
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SuperAdminRoutingModule { }
