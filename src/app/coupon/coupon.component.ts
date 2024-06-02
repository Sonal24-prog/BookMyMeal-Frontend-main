import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  name: string = '';
  userId: number | undefined;
  currentDate: string = '';
  currentDay: string = '';
  couponCode: string = '';
  redeemed: boolean = false;
  validity: number | undefined;

  constructor(private couponService: CouponService, private authService: AuthService) {}

  ngOnInit(): void {
    this.name = this.authService.getLoggedInUserName();
    this.userId = this.authService.getLoggedInUserId();
    this.currentDate = new Date().toLocaleDateString();
    this.currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  }
  redeemCoupon(): void {
    if (this.userId) {
      console.log('Generating coupon for user ID:', this.userId); // Log userId
      this.couponService.generateCoupon(this.userId).subscribe(
        response => {
          this.couponCode = response.couponId;
          this.validity = response.validity;
          this.redeemed = true;
        },
        error => {
          console.error('Failed to generate coupon:', error);
          // Handle error
        }
      );
    } else {
      console.error('User ID not found');
      // Handle error
    }
  }
  
}







// import { Component, OnInit } from '@angular/core';
// import { catchError, interval, Observable, Subscription, tap, throwError, timer } from 'rxjs';
// import { pipe } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { CouponService } from '../services/coupon.service';
// import { AuthService } from '../services/auth.service';
// import { firstValueFrom } from 'rxjs';


// @Component({
//   selector: 'app-coupon',
//   templateUrl: './coupon.component.html',
//   styleUrls: ['./coupon.component.css']
// })
// export class CouponComponent{} 
// implements OnInit{

//   qrCodeValue: string = '';
//   couponCode: string = '';
//   email!: string;
//   showQrCode: boolean = false;
//   employeeId!: number;
//   showScanner: boolean = false;

//   constructor(private couponService: CouponService,
//     private authService: AuthService
//   ) { }

//   ngOnInit(): void {
//     // Retrieve user from localStorage
//     const user = localStorage.getItem('user');
//     if (user) {
//       const userObj = JSON.parse(user);
//       this.employeeId = userObj.id; // Retrieve the ID from the parsed object
//     } else {
//       console.error('User ID not found in localStorage');
//     }
//   }
  

//   getLoggedInEmployee(): Observable<any> {
//     return this.authService.getLoggedInEmployeeId().pipe(
//       tap((employee: any) => console.log(employee)),
//       catchError(error => {
//         console.error('Error:', error);
//         return throwError(error); // You can handle the error here or rethrow it
//       })
//     );
//   }

//   generateQRCode(): void {
//     if (this.employeeId) {
//       this.couponService.generateCoupon(this.employeeId).subscribe({
//         next: (response) => {
//           this.couponCode = response.couponId;
//           this.qrCodeValue = this.couponCode;
//           this.showQrCode = true;

//           console.log(this.couponCode);

//           // Hide QR code after one minute
//           timer(60000).subscribe(() => {
//             this.showQrCode = false;
//           });
//         },
//         error: (error) => {
//           console.error('Failed to generate coupon', error);
//         },
//         complete: () => {
//           console.log('Coupon generation process completed.');
//         }
//       });
//     } else {
//       console.error('Invalid Id');
//     }
//   }
  
  
// }