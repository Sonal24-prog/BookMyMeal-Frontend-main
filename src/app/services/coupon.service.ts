import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
 private baseUrl = 'http://localhost:8080/coupons';
  generateCouponForAuthenticatedUser() {
    throw new Error('Method not implemented.');
  }
  
  constructor(private http: HttpClient) { }


 
  // generateCoupon(userId: number): Observable<any> {
  //   return this.http.post<any>('http://localhost:8080/coupons/generate', { id: userId });
  // }

  generateCoupon(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate`, null, {
      params: { id: userId.toString() }
    });
  }
  validateCoupon(couponId: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/coupons/validate', { couponId });
  }
}

