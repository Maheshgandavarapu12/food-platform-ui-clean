import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      // { path: 'users' }, // TODO: Create users management
      // { path: 'sellers'}, // TODO: Create sellers management
      // { path: 'orders' }, // TODO: Create orders management
      // { path: 'products' }, // TODO: Create products management
      // { path: 'reports' }, // TODO: Create reports component
      // { path: 'settings' } // TODO: Create settings component
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }





// const routes: Routes = [
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: AdminDashboardComponent },
//       { path: 'users', component: null }, // TODO: Create users management
//       { path: 'sellers', component: null }, // TODO: Create sellers management
//       { path: 'orders', component: null }, // TODO: Create orders management
//       { path: 'products', component: null }, // TODO: Create products management
//       { path: 'reports', component: null }, // TODO: Create reports component
//       { path: 'settings', component: null } // TODO: Create settings component
//     ]
//   }
// ];
