import { Injectable } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderResponse } from '../../core/models/seller';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
private baseUrl = `${environment.apiUrl}/Items`;
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.baseUrl}/GetAll/3FA85F64-5717-4562-B3FC-2C963F66AFA6`)
    .pipe(catchError(this.handleError));  
  }

  changeOrderStatus(orderId: string, status: number): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(`${this.baseUrl}/UpdateStatus/${orderId}?status=${status}`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
      console.error('API Error:', error);
      return throwError(() => error);
    }
}
