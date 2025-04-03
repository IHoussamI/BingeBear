import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface OrderData {
  plan: {
    id: any;
    name: string;
    price: any;
  };
  client: any;
  orderDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // Update with your API endpoint

  constructor(private http: HttpClient) {}
  
  createOrder(sessionId: string, planId: number, clientEmail: string): Observable<any> {
    return this.http.post(this.apiUrl, null, {
      params: {
        sessionId,
        planId: planId.toString(),
        clientEmail
      }
    });
  }
}
