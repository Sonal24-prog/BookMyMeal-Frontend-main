import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-quickbooking',
  templateUrl: './quickbooking.component.html',
  styleUrls: ['./quickbooking.component.css']
})
export class QuickBookingComponent implements OnInit {
  bookingForm: FormGroup;
  loggedInUserId!: number;
  nextDay: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<QuickBookingComponent>,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    this.bookingForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.maxLength(100)]],
      mealType: ['', Validators.required]
    });

    // Set nextDay to tomorrow's date
    this.nextDay = moment().add(1, 'days').format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.bookingForm.patchValue({
      userId: this.loggedInUserId
    });
  }

  quickBookMeal(): void {
    if (this.bookingForm.invalid) {
      this.snackBar.open('Please fill out all the required fields.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }

    const userId = this.bookingForm.value.userId;
    const mealType = this.bookingForm.value.mealType;
    const currentTime = moment();
    const cutoffTime = moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
    const nextDay = moment().add(1, 'days');
    const isWeekend = nextDay.day() === 6 || nextDay.day() === 0;

    if (currentTime.isAfter(cutoffTime)) {
      this.snackBar.open('Quick Booking should be made before 8 PM.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }

    if (isWeekend) {
      this.snackBar.open('Quick booking cannot be done for weekends.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }

    const bookingData = {
      userId,
      mealType
    };

    this.bookingService.quickBookMeal(userId, mealType)
      .subscribe(
        response => {
          const notification: Notification = {
            id: Date.now(),
            userId: this.loggedInUserId,
            message: `Quick booking confirmed for ${mealType} on ${nextDay.format('YYYY-MM-DD')}.`,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
          };

          // this.notificationService.addNotification(notification).subscribe();

          this.snackBar.open('Booking successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            verticalPosition:'top'
          });
          this.bookingForm.reset();
          this.dialogRef.close();
        },
        error => {
          this.snackBar.open('Booking failed: ' + error.error, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            verticalPosition:'top'
          });
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close();
    this.bookingForm.reset();
  }
}




//   bookingForm: FormGroup;
//   loggedInUserId!: string; // Add a property to store the logged-in user's ID

//   constructor(
//     private formBuilder: FormBuilder,
//     private bookingService: BookingService,
//     private authService: AuthService, // Inject the authentication service
//     public dialogRef: MatDialogRef<QuickBookingComponent>,
//     private snackBar: MatSnackBar
//   ) {
//     this.bookingForm = this.formBuilder.group({
//       userId: ['', [Validators.required, Validators.maxLength(100)]],
//       mealType: ['', Validators.required]
//     });
//    }

//   ngOnInit(): void {
//     // Retrieve the logged-in user's ID and pre-fill the form
//     this.loggedInUserId = this.authService.getLoggedInUserId();
//     this.bookingForm.patchValue({
//       userId: this.loggedInUserId
//     });
//   }

//   quickBookMeal(): void {
//     // Remaining code remains the same
//     // Ensure you have imported and implemented AuthService properly
//     if (this.bookingForm.invalid) {
//       this.snackBar.open('Please fill out all the required fields.', 'Close', {
//         duration: 3000,
//         panelClass: ['error-snackbar']
//       });
//       return;
//     }

//     const userId = this.bookingForm.value.userId;
//     const mealType = this.bookingForm.value.mealType;
//     const currentTime = moment();
//     const cutoffTime = moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
//     const nextDay = moment().add(1, 'days');
//     const isWeekend = nextDay.day() === 6 || nextDay.day() === 0; // Saturday = 6, Sunday = 0

//     if (currentTime.isAfter(cutoffTime)) {
//       this.snackBar.open('Quick Booking should be made before 8 PM.', 'Close', {
//         duration: 5000,
//         panelClass: ['error-snackbar']
//       });
//       return;
//     }

//     if (isWeekend) {
//       this.snackBar.open('Quick booking cannot be done for weekends.', 'Close', {
//         duration: 5000,
//         panelClass: ['error-snackbar']
//       });
//       return;
//     }

//     this.bookingService.quickBookMeal(userId, mealType)
//       .subscribe(
//         response => {
//           this.snackBar.open(response, 'Close', {
//             duration: 3000,
//             panelClass: ['success-snackbar']
//           });
//           this.bookingForm.reset();
//         },
//         error => {
//           this.snackBar.open(error, 'Close', {
//             duration: 3000,
//             panelClass: ['error-snackbar']
//           });
//         }
//       );
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//     this.bookingForm.reset();
//   }
// }
