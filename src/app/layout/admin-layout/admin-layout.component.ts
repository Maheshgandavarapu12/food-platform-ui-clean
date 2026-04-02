import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Component initialization if needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
