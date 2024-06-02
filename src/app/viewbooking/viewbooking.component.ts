// import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
// import { BookingService } from '../services/booking.service';
// import { AuthService } from '../services/auth.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { CancelbookingComponent } from '../cancelbooking/cancelbooking.component';
// import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
// import { ChangeDetectorRef } from '@angular/core';
// import * as moment from 'moment';

// @Component({
//   selector: 'app-viewbooking',
//   templateUrl: './viewbooking.component.html',
//   styleUrls: ['./viewbooking.component.css']
// })
// export class ViewBookingComponent implements OnInit {
//   isFormOpen: boolean = true;
//   cancelDialog: any;
//   selectedDates: Set<string> = new Set();
//   totalBookings: number = 0;
//   userId: any;
//   dialogRef: MatDialogRef<CancelbookingComponent> | null = null;
//   // dateClass: MatCalendarCellClassFunction<Date>;
//   bookedDates: Set<string> = new Set();
//   canceledDates: Set<string> = new Set();



//   constructor(
//     private bookingService: BookingService,
//     private authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute,
//     public dialog: MatDialog,
//     private cdr: ChangeDetectorRef,
//     private renderer: Renderer2,
//     private elementRef: ElementRef
//   ) {
    
//     this.userId = this.authService.getLoggedInUserId();
//   if (this.userId) {
//   this.fetchBookingDates(this.userId);
// } else {
//   console.error('User ID not found');
// }
// // this.dateClass = (date: Date): string => {
// //   const dateString = moment(date).format('YYYY-MM-DD');
// //   if (this.selectedDates.has(dateString)) {
// //     if (this.isBookingCanceled(dateString)) {
// //       return 'canceled-date';
// //     }
// //     return 'booked-date';
// //   }
// //   return '';
// // };

//   }

//   ngOnInit(): void {}

//   fetchBookingDates(userId: number): void {
//     this.bookingService.getBookingDates(userId).subscribe(
//       (dates: string[]) => {
//         console.log('Fetched dates:', dates);
//         this.selectedDates = new Set(dates);
//         this.totalBookings = dates.length;
//         console.log('Selected dates:', this.selectedDates);
  
//         // Log canceled dates if available
//         console.log('Canceled dates:', this.canceledDates);
  
//         this.cdr.detectChanges();  // Ensure the view updates after fetching data
//       },
//       error => {
//         console.error('Error fetching booking dates', error);
//       }
//     );
//   }

  

//   openCancelBooking(date: Date | null = new Date()): void {
//     if (date) {
//       const dateString = this.formatDate(date);
//       if (this.selectedDates.has(dateString)) {
//         if (!this.bookingService.isBookingCancelled(dateString)) {
//           this.dialogRef = this.dialog.open(CancelbookingComponent, {
//             data: { date: date },
//           });

//           this.dialogRef.afterClosed().subscribe(result => {
//             console.log('Dialog result:', result);
//             if (result && result.cancelled) {
//               this.selectedDates.delete(dateString);
//               this.totalBookings--;
//               console.log(`Booking for ${dateString} canceled.`);
//               this.router.navigate(['/some-other-route']);
//             }
//           });
//         }
//       }
//     } else {
//       console.error('No date selected.');
//     }
//   }

//   formatDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   onDateSelected(date: Date | null): void {
//     if (date) {
//       const dateString = this.formatDate(date);
//       if (this.selectedDates.has(dateString)) {
//         this.openCancelBooking(date);
//       }
//     }
//   }

//   closeViewBooking(): void {
//     this.dialog.closeAll();
//   }

//   bookMeal(): void {
//     // Your code to handle booking a meal
//     // After successful booking, update the total bookings count
//     this.totalBookings++;
//     // Add the booked date to selectedDates
//     const newBookingDate = new Date(); // replace with the actual booked date
//     this.selectedDates.add(this.formatDate(newBookingDate));
//   }

//   cancelBooking(dateString: string): void {
//     this.bookingService.cancelBooking(dateString).subscribe(
//       () => {
//         console.log('Booking canceled successfully.');
//         // Update the total bookings count after successful cancellation
//         this.totalBookings--;
//         // Remove the canceled date from selectedDates
//         this.selectedDates.delete(dateString);
//       },
//       error => {
//         console.error('Error canceling booking:', error);
//       }
//     );
//   }

//   isBookingCanceled(dateString: string): boolean {
//     return this.canceledDates.has(dateString);
//   }
//   dateClass: MatCalendarCellClassFunction<Date> = (date: Date): string => {
//     const dateString = moment(date).format('YYYY-MM-DD');
//     if (this.selectedDates.has(dateString)) {
//       if (this.isBookingCanceled(dateString)) {
//         return 'canceled-date';
//       }
//       return 'booked-date';
//     }
//     return '';
//   };
// }


import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelbookingComponent } from '../cancelbooking/cancelbooking.component';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewBookingComponent implements OnInit {
  isFormOpen: boolean = true;
  cancelDialog: any;
  selectedDates: Set<string> = new Set();
  totalBookings: number = 0;
  userId: any;
  dialogRef: MatDialogRef<CancelbookingComponent> | null = null;
  canceledDates: Set<string> = new Set();

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId) {
      this.fetchBookingDates(this.userId);
    } else {
      console.error('User ID not found');
    }
  }

  ngOnInit(): void {}

  fetchBookingDates(userId: number): void {
    this.bookingService.getBookingDates(userId).subscribe(
      (dates: string[]) => {
        console.log('Fetched dates:', dates);
        this.selectedDates = new Set(dates);
        this.totalBookings = dates.length;
        console.log('Selected dates:', this.selectedDates);
        this.cdr.detectChanges();  // Ensure the view updates after fetching data
      },
      error => {
        console.error('Error fetching booking dates', error);
      }
    );
  }

  openCancelBooking(date: Date | null = new Date()): void {
    if (date) {
      const dateString = this.formatDate(date);
      if (this.selectedDates.has(dateString)) {
        if (!this.bookingService.isBookingCancelled(dateString)) {
          this.dialogRef = this.dialog.open(CancelbookingComponent, {
            data: { date: date },
          });

          this.dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog result:', result);
            if (result && result.cancelled) {
              this.selectedDates.delete(dateString);
              this.totalBookings--;
              console.log(`Booking for ${dateString} canceled.`);
              this.router.navigate(['/some-other-route']);
            }
          });
        }
      }
    } else {
      console.error('No date selected.');
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateSelected(date: Date | null): void {
    if (date) {
      const dateString = this.formatDate(date);
      if (this.selectedDates.has(dateString)) {
        this.openCancelBooking(date);
      }
    }
  }

  closeViewBooking(): void {
    this.dialog.closeAll();
  }

  bookMeal(): void {
    // Your code to handle booking a meal
    // After successful booking, update the total bookings count
    this.totalBookings++;
    // Add the booked date to selectedDates
    const newBookingDate = new Date(); // replace with the actual booked date
    this.selectedDates.add(this.formatDate(newBookingDate));
  }

  cancelBooking(dateString: string): void {
    this.bookingService.cancelBooking(dateString).subscribe(
      () => {
        console.log('Booking canceled successfully.');
        // Update the total bookings count after successful cancellation
        this.totalBookings--;
        // Remove the canceled date from selectedDates
        this.selectedDates.delete(dateString);
      },
      error => {
        console.error('Error canceling booking:', error);
      }
    );
  }

  isBookingCanceled(dateString: string): boolean {
    return this.canceledDates.has(dateString);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (date: Date): string => {
    const dateString = moment(date).format('YYYY-MM-DD');
    if (this.selectedDates.has(dateString)) {
      if (this.isBookingCanceled(dateString)) {
        return 'canceled-date';
      }
      return 'booked-date';
    }
    return '';
  };
}
