import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from './errors-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [CommonModule, ErrorsRoutingModule]
})
export class ErrorsModule { }
