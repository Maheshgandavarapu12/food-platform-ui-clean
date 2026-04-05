import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from '../../layout/user-layout/user-layout.component';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent }
      // { path: 'browse-food' }, // TODO: Create browse food component
      // { path: 'orders' }, // TODO: Create orders component
      // { path: 'cart' }, // TODO: Create cart component
      // { path: 'wishlist' }, // TODO: Create wishlist component
      // { path: 'reviews' }, // TODO: Create reviews component
      // { path: 'addresses' }, // TODO: Create addresses component
      // { path: 'wallet' }, // TODO: Create wallet component
      // { path: 'settings' } // TODO: Create settings component
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }
