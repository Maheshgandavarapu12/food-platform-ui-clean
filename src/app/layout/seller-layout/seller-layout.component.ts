import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-seller-layout',
    templateUrl: './seller-layout.component.html',
    styleUrls: ['./seller-layout.component.scss'],
    standalone: false
})
export class SellerLayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Component initialization if needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
