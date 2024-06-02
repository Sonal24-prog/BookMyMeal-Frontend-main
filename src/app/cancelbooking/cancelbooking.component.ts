// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NotificationService } from '../services/notification.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-cancelbooking',
//   templateUrl: './cancelbooking.component.html',
//   styleUrls: ['./cancelbooking.component.css']
// })
// export class CancelbookingComponent {
//   loggedInUserId: any;

//   constructor(
//     public dialogRef: MatDialogRef<CancelbookingComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { date: Date },
//     private notificationService: NotificationService,
//     private snackBar: MatSnackBar
//   ) {}

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onConfirm(): void {
//     // You can add any other logic here if needed, but remove the HTTP request for canceling the booking
//     console.log('Booking cancellation confirmed.');
//     this.notificationService.addNotification({
//       type: 'cancel',
//       date: new Date(),
//     });
//     this.dialogRef.close({ cancelled: true }); // Pass a result back
//     this.snackBar.open('Booking cancellation confirmed.', 'Close', {
//       duration: 3000,
//       verticalPosition: 'top'
//     });
//   }
// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../services/booking.service';
import { NotificationService, Notification } from '../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-cancelbooking',
  templateUrl: './cancelbooking.component.html',
  styleUrls: ['./cancelbooking.component.css']
})
export class CancelbookingComponent {
  loggedInUserId: any;

  constructor(
    public dialogRef: MatDialogRef<CancelbookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date },
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    const now = moment();
    const cancelTimeLimit = moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 });

    // Check if cancellation is not for today
    if (moment(this.data.date).isSame(now, 'day')) {
      this.snackBar.open('Cancellation cannot be made for today.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    // Check if cancellation is not after 10 PM
    if (now.isAfter(cancelTimeLimit)) {
      this.snackBar.open('Cancellation cannot be made after 10 PM.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    // Allow cancellation if the above validations pass
    const dateString = this.formatDate(this.data.date);
    this.bookingService.cancelBooking(dateString).subscribe(
      () => {
        console.log('Booking canceled successfully.');
        const notification: Notification = {
          id: Date.now(),
          userId: this.loggedInUserId,
          message: `Booking for ${dateString} has been canceled.`,
          date: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        // this.notificationService.addNotification(notification).subscribe();

        this.dialogRef.close({ cancelled: true }); // Pass a result back
        this.snackBar.open('Booking cancellation confirmed.', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Error canceling booking:', error);
        this.snackBar.open('Failed to cancel booking. Please try again later.', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
