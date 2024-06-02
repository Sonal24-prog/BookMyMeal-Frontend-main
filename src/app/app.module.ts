import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SingupComponent } from './singup/singup.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormGroup } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { QuickBookingComponent } from './quickbooking/quickbooking.component';
import { ViewBookingComponent } from './viewbooking/viewbooking.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {CancelbookingComponent} from './cancelbooking/cancelbooking.component';
import { CouponComponent } from './coupon/coupon.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationComponent } from './notification/notification.component';

import { QrCodeModule } from 'ng-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { PrivacyPoclicyComponent } from './privacy-poclicy/privacy-poclicy.component';
import { TermsComponent } from './terms/terms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    ForgotPasswordComponent,
    OTPValidationComponent,
    SingupComponent,
    NewpasswordComponent,
    ChangepasswordComponent,   
    DashboardComponent, HeaderComponent, BookingComponent, 
    QuickBookingComponent,
    ViewBookingComponent,
CancelbookingComponent,
CouponComponent,
NotificationComponent,
PrivacyPoclicyComponent,
TermsComponent,
AboutusComponent,
FooterComponent,



   
    
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    NgxUiLoaderModule,
    NgbNavModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FullCalendarModule,
     QRCodeModule,
    MatMenuModule,
    QrCodeModule,
  
  
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    NgxUiLoaderRouterModule.forRoot({showForeground: true}),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
