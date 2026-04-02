import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [SellerDashboardComponent],
  imports: [CommonModule, SellerRoutingModule, LayoutModule]
})
export class SellerModule { }
