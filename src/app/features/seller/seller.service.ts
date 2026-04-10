import { Injectable } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Item, ItemResponse } from '../../core/models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService{
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.baseUrl}/GetAll/3FA85F64-5717-4562-B3FC-2C963F66AFA6`)
    .pipe(catchError(this.handleError));
  }
  deleteItem(itemId: string): Observable<ItemResponse> {
    return this.http.delete<ItemResponse>(`${this.baseUrl}/Delete/${itemId}`)
      .pipe(catchError(this.handleError));
  }

  createItem(item: Item): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.baseUrl}/Create`, item)
      .pipe(catchError(this.handleError));
  }

  editItem(item: Item): Observable<ItemResponse> {
    return this.http.put<ItemResponse>(`${this.baseUrl}/Update`, item)
      .pipe(catchError(this.handleError));
  }

  getItemById(itemId: string): Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.baseUrl}/GetById/${itemId}`)
      .pipe(catchError(this.handleError));
  }
  
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
