import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  getBookingForUserAndDate(loggedInUserId: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/api/bookings';
  private canceledBookings: Set<string> = new Set();

  constructor(private http: HttpClient) { }

  public bookMeal(bookingDetails: any, isBulk: boolean): Observable<any> {
    const endpoint = isBulk ? `${this.baseUrl}/bulk` : `${this.baseUrl}/single`;
    return this.http.post<any>(endpoint, bookingDetails);
  }

  public quickBookMeal(userId: number, mealType: string): Observable<any> {
    const endpoint = `${this.baseUrl}/quickBook`;
    const body = { userId, mealType };
    return this.http.post<any>(endpoint, body);
  }

  public getBookingDates(userId: number): Observable<string[]> {
    const endpoint = `${this.baseUrl}/dates/${userId}`;
    return this.http.get<string[]>(endpoint);
  }

  public cancelBooking(cancellationDate: string): Observable<string> {
    const endpoint = `${this.baseUrl}/cancel?cancellationDate=${cancellationDate}`;
    return this.http.post<string>(endpoint, null);
  }

//   public cancelBooking(cancellationDate: Date): Observable<Map<string, string>> {
//     const endpoint = `${this.baseUrl}/cancel`;
//     return this.http.post<Map<string, string>>(endpoint, { cancellationDate });
// }



  public isBookingCancelled(date: string): boolean {
    return this.canceledBookings.has(date);
  }
  
  // You might need methods to add or remove bookings from the canceled list
}


  // Other service methods...




// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';


// interface Booking {
//   id: number;
//   userId: string;
//   bookingDate: string;
//   cancelled?: boolean;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {
//   getBookingsForEmployee(loggedInEmployeeId: void) {
//     throw new Error('Method not implemented.');
//   }

 
//   getCancelledDates(): Observable<any[]> {
//     // Assuming your backend API has an endpoint to fetch cancelled dates
//     // Adjust the API endpoint according to your backend implementation
//     return this.http.get<any[]>(`${this.baseUrl}/cancel-dates`);
//   }
 

//   private baseUrl = 'http://localhost:8080/api/booking';

//   constructor(private http: HttpClient) { }

//   quickBookMeal(mealType: string, userId?: string): Observable<string> {
//     let params = new HttpParams().set('mealType', mealType);
//     if (userId) {
//       params = params.set('userId', userId);
//     }
//     return this.http.post<string>(`${this.baseUrl}/quick`, params, { responseType: 'text' as 'json' });
//   }

//   // public singleBookMeal(date: string, userId: string, mealType: MealType): Observable<string> {
//   //   const params = new HttpParams()
//   //     .set('date', date)
//   //     .set('userId', userId)
//   //     .set('mealType', mealType);
//   //   return this.http.post<string>(`${this.baseUrl}/single`, params, { responseType: 'text' as 'json' });
//   // }

//   // public bulkBookMeals(mealType: MealType, startDate: string, endDate: string, userId: string): Observable<string> {
//   //   const params = new HttpParams()
//   //     .set('mealType', mealType)
//   //     .set('startDate', startDate)
//   //     .set('endDate', endDate)
//   //     .set('userId', userId);
//   //   return this.http.post<string>(`${this.baseUrl}/bulk`, params, { responseType: 'text' as 'json' });
//   // }

//   public bookMeal(bookingDetails: any): Observable<string> {
//     return this.http.post<string>(`${this.baseUrl}/book-meal`, bookingDetails, { responseType: 'text' as 'json' });
//   }

//   // public cancelBookings(bookings: number[]): Observable<string> {
//   //   return this.http.delete<string>(`${this.baseUrl}/cancel`, { body: bookings, responseType: 'text' as 'json' });
//   // }
//   getBookings(userId: string): Observable<Booking[]> {
//     // Adjust the API endpoint to match your backend implementation
//     return this.http.get<Booking[]>(`${this.baseUrl}/employee/${userId}`);
//   }
  

//   cancelBooking(bookingId: number): Observable<void> {
//     return this.http.post<void>(`${this.baseUrl}/cancel`, [bookingId]);
//   }

  
// }


// export enum MealType {

//   LUNCH = 'LUNCH',
//   DINNER = 'DINNER'
// }
