import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { $

 } from '@fullcalendar/core/internal-common';

export class User {
  name = '';
  email = '';
  password = '';
}

export class verifyOtp{
  email = '';
  otp = '';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url = environment.apiUrl;
  private userName: string = 'Employee';
  private apiUrl = "http://localhost:8080/api";


  constructor(private httpClient: HttpClient) { }

  signup(signupRequest: User) {
    console.log("Signup request", signupRequest);
    return this.httpClient.post(this.apiUrl + "/auth/signup", signupRequest);
  }

  // verifyOtp(verifyRequest: verifyOtp){
  //   let params = new HttpParams().set('email', verifyRequest.email).set('otp', verifyRequest.otp);
  //   return this.httpClient.post(`${this.apiUrl}/verify-otp`, {}, { params })
  //     .pipe(catchError(this.handleError));
  // }

  verifyOtp(email: string, otp: string): Observable<any> {
    let params = new HttpParams().set('email', email).set('otp', otp);
    return this.httpClient.post(`${this.apiUrl}/verify-otp`, {}, { params })
      .pipe(catchError(this.handleError));
  }


  sendOtp(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.post(`${this.apiUrl}/forgot-password`, {}, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.error.message || error.message || error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  login(loginRequest: any): Observable<any> {
    console.log("Login request", loginRequest);
    return this.httpClient.post<[]>(this.apiUrl + "/auth/login", loginRequest);
    // return this.httpClient.post(this.url +
    //   'api/auth/login', data,{
    //     headers: new HttpHeaders().set('Content-Type', 'application/json'),
    //   });

  }

 
  
  changePassword(email: string, oldPassword: string, newPassword: string) {
  
    const body = { email, oldPassword, newPassword };
    return this.httpClient.post<any>(this.apiUrl +"/change-password", body);
  }

  

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    let params = new HttpParams().set('email', email).set('otp', otp).set('newPassword', newPassword);
    return this.httpClient.post(`${this.apiUrl}/reset-password`, {}, { params })
      .pipe(
        catchError(error => {
          let errorMessage = 'Something went wrong; please try again later.';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `An error occurred: ${error.error.message}`;
          } else if (error.status === 0) {
            // Server-side error or network issue
            errorMessage = 'Server is unreachable. Please check your internet connection.';
          } else {
            // Server returned an unsuccessful response code
            errorMessage = `Error: ${error.status} - ${error.error.message}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  // resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
  //   let params = new HttpParams().set('email', email).set('otp', otp).set('newPassword', newPassword);
  //   return this.httpClient.post(`${this.apiUrl}/reset-password`, {}, { params })
  //     .pipe(catchError(this.handleError));
  // }

  checkToken(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.httpClient.get(this.apiUrl + "/user/checkToken", { headers });
  }
  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }
}
