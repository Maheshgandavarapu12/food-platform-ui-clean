import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from '../../layout/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SellerDashboardComponent }
      // { path: 'products' }, // TODO: Create products component
      // { path: 'orders'}, // TODO: Create orders component
      // { path: 'analytics'}, // TODO: Create analytics component
      // { path: 'reviews'}, // TODO: Create reviews component
      // { path: 'customers'}, // TODO: Create customers component
      // { path: 'wallet' }, // TODO: Create wallet component
      // { path: 'settings'} // TODO: Create settings component
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SellerRoutingModule { }
