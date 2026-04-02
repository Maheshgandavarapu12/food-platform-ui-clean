import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Component initialization if needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
