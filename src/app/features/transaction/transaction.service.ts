import { Injectable } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TransactionResponse } from '../../core/models/seller';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = `${environment.apiUrl}/Transactions`;
  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.baseUrl}/GetAll/3FA85F64-5717-4562-B3FC-2C963F66AFA6`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
