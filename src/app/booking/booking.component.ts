import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { NotificationService, Notification } from '../services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  loggedInUserId: any;
  isBulkBooking: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<BookingComponent>
  ) {
    this.bookingForm = this.formBuilder.group({
      bookingType: ['', Validators.required],
      mealType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.updateEndDate();
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }
  
    const mealType = this.bookingForm.value.mealType;
    const startDate = moment(this.bookingForm.value.startDate);
    let endDate = moment(this.bookingForm.value.endDate);
  
    if (!endDate.isValid() || this.bookingForm.value.bookingType === 'single') {
      endDate = startDate;
    }
  
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
  
    if (endDate.isBefore(startDate)) {
      this.snackBar.open('End date must be after start date.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }
  
    if (endDate.isSameOrBefore(today) || startDate.isSameOrBefore(yesterday)) {
      this.snackBar.open('Bookings cannot be made for today or yesterday.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }
  
    const currentTime = moment();
    const maxBookingDate = moment().add(this.isBulkBooking ? 3 : 1, 'month').set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
    maxBookingDate.add(1, 'days');
  
    if (currentTime.isAfter(maxBookingDate)) {
      this.snackBar.open('Bookings cannot be made after 8 PM.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }
  
    if (this.isWeekend(startDate) || this.isWeekend(endDate)) {
      this.snackBar.open('Cannot book meals for Saturdays or Sundays.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition:'top'
      });
      return;
    }
  
    // Check for existing booking dates for the selected date
    const selectedDate = moment(this.bookingForm.value.startDate).format('YYYY-MM-DD');
    this.bookingService.getBookingDates(this.loggedInUserId).subscribe(bookingDates => {
      if (bookingDates.includes(selectedDate)) {
        this.snackBar.open('You already have a booking for this date.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition:'top'
        });
      } else {
        // Proceed with the booking if the user doesn't have a booking for the selected date
        const bookingDetails = {
          mealType: mealType,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          userId: this.loggedInUserId
        };
  
        console.log('Booking Details:', bookingDetails);
  
        this.bookingService.bookMeal(bookingDetails, this.isBulkBooking).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            const notification: Notification = {
              id: Date.now(),
              userId: this.loggedInUserId,
              message: `Booking Confirmed for ${startDate.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}.`,
              date: moment().format('YYYY-MM-DD HH:mm:ss') // Adding the date property
            };
            // this.notificationService.addNotification(notification).subscribe();
  
            this.snackBar.open('Booking successful', 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar']
            });
            this.dialogRef.close();
          },
          error: (error: any) => {
            console.error('Error:', error);
            this.snackBar.open('Failed to book meal', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition:'top'
            });
          }
        });
      }
    });
  }
  

  onMealTypeChange(bookingType: string): void {
    this.isBulkBooking = bookingType === 'bulk';
    this.updateEndDate();
  }

  onCancel(): void {
    this.bookingForm.reset();
    this.dialogRef.close();
  }

  isWeekend(date: moment.Moment): boolean {
    return date.day() === 0 || date.day() === 6;
  }

  minDate(): string {
    return moment().format('YYYY-MM-DD');
  }

  maxDate(): string {
    return moment().add(3, 'months').format('YYYY-MM-DD');
  }

  updateEndDate(): void {
    if (this.bookingForm.value.bookingType === 'single') {
      const startDate = moment(this.bookingForm.value.startDate);
      this.bookingForm.patchValue({ endDate: startDate.format('YYYY-MM-DD') });
    }
  }
}







// / import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BookingService } from '../services/booking.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import * as moment from 'moment';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.css']
// })
// export class BookingComponent implements OnInit {
//   bookingForm: FormGroup;
//   loggedInUserId!: string;

//   constructor(
//     private formBuilder: FormBuilder,
//     private bookingService: BookingService,
//     private snackBar: MatSnackBar,
//     private authService: AuthService
//   ) {
//     this.bookingForm = this.formBuilder.group({
//       mealType: ['Breakfast', Validators.required], // Default meal type
//       startDate: ['', Validators.required],
//       endDate: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loggedInUserId = this.authService.getLoggedInUserId();
//   }

//   onSubmit(): void {
//     if (this.bookingForm.invalid) {
//       return;
//     }

//     const mealType = this.bookingForm.value.mealType;
//     const startDate = moment(this.bookingForm.value.startDate);
//     let endDate = moment(this.bookingForm.value.endDate);

//     if (!endDate.isValid()) {
//       endDate = startDate;
//     }

//     // Validate end date is after start date
//     if (endDate.isBefore(startDate)) {
//       this.snackBar.open('End date must be after start date.', 'Close', {
//         duration: 3000,
//         panelClass: ['error-snackbar']
//       });
//       return;
//     }

//     // Validate weekend
//     if (this.isWeekend(startDate) || this.isWeekend(endDate)) {
//       this.snackBar.open('Cannot book meals for Saturdays or Sundays.', 'Close', {
//         duration: 3000,
//         panelClass: ['error-snackbar']
//       });
//       return;
//     }

//     // Other validations...z

//     const bookingDetails = {
//       mealType: mealType,
//       startDate: startDate.format('YYYY-MM-DD'),
//       endDate: endDate.format('YYYY-MM-DD'),
//       userId: this.loggedInUserId
//     };

//     // Call the API to book the meal
//     this.bookingService.bookMeal(bookingDetails)
//       .subscribe({
//         next: (response: string) => {
//           this.snackBar.open(response, 'Close', {
//             duration: 5000,
//             panelClass: ['success-snackbar']
//           });
//         },
//         error: (error: any) => {
//           console.error('Error:', error);
//           this.snackBar.open('Failed to book meal', 'Close', {
//             duration: 3000,
//             panelClass: ['error-snackbar']
//           });
//         }
//       });
//   }

//   onMealTypeChange(mealType: string): void {
//     // Update the meal type when the user selects a different option
//     this.bookingForm.patchValue({ mealType: mealType });
//   }

//   onCancel(): void {
//     // Reset the form when canceled
//     this.bookingForm.reset();
//   }

//   isWeekend(date: moment.Moment): boolean {
//     return date.day() === 0 || date.day() === 6; 
//   }
// }
