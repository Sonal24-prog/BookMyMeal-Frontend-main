import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { QuickBookingComponent } from '../quickbooking/quickbooking.component';
import { Router } from '@angular/router';
 import { ViewBookingComponent } from '../viewbooking/viewbooking.component';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';

interface Bookings {
  [key: string]: {
    lunch?: boolean;
    dinner?: boolean;
  };
}

@Component({
  selector: 'app-dashboarad',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{

  
 


  selectedTime: any;
  bookedDates: any[] = [];
  canceledDates: any[] = [];
  date: any;
  disableClose :boolean = false;
  public users: any = [];
  dateFilter: any;
  cell!: Date;
  currentMenu: { lunch: string[]; dinner: string[] } = {
    lunch: [],
    dinner: [],
   
  };

  selectedDate: Date | null = null;
  mealType: 'lunch' | 'dinner' | null = null;
  snackBar: any;

 constructor(
  private dialog : MatDialog,
  private router: Router,
  private bookService :BookingService,
  private authService: AuthService,
 ){
 }  
 ngOnInit(): void {
  this.fetchBookings();
}

fetchBookings() {
  // Fetch booked dates for the current user
  const userId = this.authService.getLoggedInUserId();
  this.bookService.getBookingDates(userId).subscribe(
    (data) => {
      this.bookedDates = data.map((bookingDate: any) => new Date(bookingDate));
    },
    (error) => {
      console.error('Error fetching bookings:', error);
    }
  );
}






openQuickBooking(): void {
  const dialogRef = this.dialog.open(QuickBookingComponent, {
    width: '500px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'booked') {
      this.addNotification('Meal booked successfully.');
    } else if (result === 'canceled') {
      this.addNotification('Meal booking canceled.');
    }
  });
}


navigateToViewBooking() {

  this.router.navigate(['/viewbooking']);
}


  // View booking
  openAddBookingModal(): void {
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'booked' || result === 'canceled') {
        const message = result === 'booked' ? 'Meal booked successfully.' : 'Meal booking canceled.';
        // const notification: Notification = { id: 0, userId: '', timestamp: new Date(), message };
        // this.notificationService.sendNotification(notification).subscribe(() => {
        //   this.fetchNotifications(); // Update notifications after sending notification
        // });
      }
    });
  }
  addNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  openViewBookingDialog(): void {
  const dialogRef = this.dialog.open(ViewBookingComponent, {
    width: '500px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(() => {
    // Perform any actions needed after the dialog is closed
    console.log('Dialog closed. Updating data or performing cleanup...');
  });

  
   
    // dialogRef.close(); // You can call this if you want to close the dialog programmatically
  }
  dayMenus: { [key: string]: { lunch: string[]; dinner: string[] } } = {
    Sunday: { lunch: [], dinner: [] },
    Monday: {
      lunch: ['Matar Paneer', 'Jeera Rice', 'Chapati', 'Raita'],
      dinner: ['Chole Bhature', 'Salad', 'Gulab Jamun'],
    },
    Tuesday: {
      lunch: ['Rajma Chawal', 'Papad', 'Pickle', 'Dahi'],
      dinner: ['Palak Paneer', 'Naan', 'Salad', 'Kheer'],
    },
    Wednesday: {
      lunch: ['Baingan Bharta', 'Paratha', 'Salad', 'Buttermilk'],
      dinner: ['Dum Aloo', 'Rice', 'Chapati', 'Halwa'],
    },
    Thursday: {
      lunch: ['Paneer Butter Masala', 'Jeera Rice', 'Chapati', 'Raita'],
      dinner: ['Vegetable Pulao', 'Raita', 'Papad', 'Rasgulla'],
    },
    Friday: {
      lunch: ['Kadhi Pakora', 'Rice', 'Papad', 'Pickle'],
      dinner: ['Aloo Gobi', 'Paratha', 'Salad', 'Ice Cream'],
    },
    Saturday: { lunch: [], dinner: [] },
  };

  dateClass = (d: Date) => {
    const day = d.getDay();
    return (day === 0 || day === 6) ? 'weekend' : '';
  };

  myDateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable Sundays and Saturdays
  };

  isWeekend(date: Date | null): boolean {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  onDateChange(date: Date | null) {
    this.selectedDate = date;
    if (date) {
      this.updateMenuForDay(date);
    }
  }

  updateMenuForDay(date: Date) {
    const dayName = this.getDayName(date);
    this.currentMenu = this.dayMenus[dayName] || { lunch: [], dinner: [] };
  }

  getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  isPastDate(date: Date): boolean {
    const today = new Date();
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  }

  isPastLunchTime(date: Date): boolean {
    const today = new Date();
    const lunchCutoff = new Date(date);
    lunchCutoff.setHours(9, 0, 0, 0);
    return date.toDateString() === today.toDateString() && today > lunchCutoff;
  }

  isPastDinnerTime(date: Date): boolean {
    const today = new Date();
    const dinnerCutoff = new Date(date);
    dinnerCutoff.setHours(14, 0, 0, 0);
    return date.toDateString() === today.toDateString() && today > dinnerCutoff;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Prevent selection of past dates and weekends
  preventSelection = (date: any): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return !this.isWeekend(date) && !this.isCanceled(date) && date >= today;
  }

  isCanceled(date: any): boolean {
    if (!date || !(date instanceof Date)) {
      return false; // If date is undefined or not a Date object, it's not canceled
    }
    return this.canceledDates.some(cancelDate => this.isSameDate(date, cancelDate));
  }

  isSameDate(date1: any, date2: any): boolean {
    if (!date1 || !date2 || !(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false; // If either date is undefined or not a Date object, they cannot be the same
    }

    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  isBooked(date: any): boolean {
    if (!date || !(date instanceof Date)) {
      return false; // If date is undefined or not a Date object, it's not booked
    }
    return this.bookedDates.some(bookedDate => this.isSameDate(date, bookedDate));
  }


  //   // Method to update selected time when a date is selected
  //   updateSelectedTime() {
  //     const currentTime = new Date();
  //     const hours = currentTime.getHours().toString().padStart(2, '0');
  //     const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  //     const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  //     this.selectedTime = ${hours}:${minutes}:${seconds};
  //   }
  
}
