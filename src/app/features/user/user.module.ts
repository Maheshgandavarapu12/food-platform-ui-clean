import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [CommonModule, UserRoutingModule, LayoutModule]
})
export class UserModule { }
