import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() notifications: any[] = [];
  @Output() clearAll = new EventEmitter<void>();
  @Output() clearOne = new EventEmitter<number>();

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: '2-digit', day: '2-digit'
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  getNotificationMessage(notification: any): string {
    if (notification.type === 'bulk') {
      return `Booking successful from ${this.formatDate(notification.startDate)} to ${this.formatDate(notification.endDate)}`;
    } else if (notification.type === 'single') {
      return `Booking successful for ${this.formatDate(notification.date)}`;
    } else if (notification.type === 'cancel') {
      return `Booking cancelled for ${this.formatDate(notification.date)}`;
    } else {
      return `Booking on ${this.formatDate(notification.date)}`;
    }
  }

  onClearOne(index: number) {
    this.clearOne.emit(index);
  }

  onClearAll() {
    this.clearAll.emit();
  }
}
