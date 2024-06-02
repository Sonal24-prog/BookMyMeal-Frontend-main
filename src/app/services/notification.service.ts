import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id: number;
  userId: number;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getNotificationsByUserId(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${userId}`);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
} // addNotification(notification: Notification): Observable<Notification> {
  //   return this.http.post<Notification>(this.apiUrl, notification);
  // }
