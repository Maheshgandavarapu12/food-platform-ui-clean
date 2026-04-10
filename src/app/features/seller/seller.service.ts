import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService implements OnInit{
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllItems()
  }

  getAllItems(){
    
  }
}
