import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications: Observable<Notification[]> = this.notifications$.asObservable();
  private notificationId = 0;

  constructor() {}

  showSuccess(message: string, duration: number = 3000): void {
    this.addNotification(message, 'success', duration);
  }

  showError(message: string, duration: number = 5000): void {
    this.addNotification(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 4000): void {
    this.addNotification(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 3000): void {
    this.addNotification(message, 'info', duration);
  }

  private addNotification(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number): void {
    const id = `notification-${++this.notificationId}`;
    const notification: Notification = { id, message, type, duration };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, notification]);

    if (duration) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notifications$.value;
    this.notifications$.next(currentNotifications.filter(n => n.id !== id));
  }

  clearAll(): void {
    this.notifications$.next([]);
  }
}
