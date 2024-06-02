import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { SingupComponent } from './singup/singup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import {CancelbookingComponent} from './cancelbooking/cancelbooking.component';
import { CouponComponent } from './coupon/coupon.component';
import { BookingComponent } from './booking/booking.component';
import { PrivacyPoclicyComponent } from './privacy-poclicy/privacy-poclicy.component';
import { TermsComponent } from './terms/terms.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {path:'',component:LoginComponent}
  ,{path:'login',component:LoginComponent}
  ,{path:'forgot-password',component:ForgotPasswordComponent}
  ,{path:'otp-validation',component:OTPValidationComponent}
  ,{path:'singup',component:SingupComponent}
  ,{path:'newpassword',component:NewpasswordComponent}
  ,{path:'changepassword',component:ChangepasswordComponent}
  ,{path:'dashboard',component:DashboardComponent},
  { path: 'cancelbooking', component: CancelbookingComponent },
  {path :'coupon',component:CouponComponent},
  {path:'Privaypolicy',component:PrivacyPoclicyComponent},
  {path:'terms',component:TermsComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'booking',component:BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
