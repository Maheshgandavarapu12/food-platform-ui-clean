import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seller-layout',
  imports: [BaseLayoutComponent,RouterOutlet],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.scss'
})
export class SellerLayoutComponent {
  
}
