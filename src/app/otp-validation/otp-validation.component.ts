import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OTPValidationComponent implements OnInit{

  verifyOtpForm!: FormGroup;
  email!: string;
  minutes: number = 5;
  seconds: number = 0;
  timeUp: boolean = false;
  private timerSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackbarService,
    private toaster: ToastrService
  ) {}

  ngOnInit(){
    this.email = this.route.snapshot.queryParams['email'];

    this.verifyOtpForm = this.fb.group({
      otp: ['',Validators.required]
    });
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  hideOtp = true;

  toggleVisibility(): void {
    this.hideOtp = !this.hideOtp;
  }

  async onSubmit() {
    if (this.verifyOtpForm.invalid) {
      return;
    }
  
    const otp = this.verifyOtpForm.value['otp'];
  
    try {

      if (this.verifyOtpForm.valid && !this.timeUp) {
        const otp = this.verifyOtpForm.value.otp;
        // Handle OTP submission
        this.router.navigate(['newpassword'], { queryParams: { email: this.email, otp } });
        this.toaster.success("OTP verified Successfully", 'Success');
        console.log('OTP:', otp);
      }
    //   const res = await this.userService.verifyOtp(this.email, otp).toPromise();
    //   console.log(res);
  
    //   if (res && res.message === 'OTP has been verified, Proceed to reset password!') {
       
    //   }
    } catch (err) {
      console.log("Error occurred", err);
      this.toaster.error('Invalid OTP or error occurred!','Error')
    }
  }
  

  get f() {
    return this.verifyOtpForm.controls;
  }

  startTimer() {
    const timer$ = interval(1000).pipe(take(300)); // 300 seconds = 5 minutes
    this.timerSubscription = timer$.subscribe((elapsed: number) => {
      const totalSeconds = 300 - elapsed;
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = totalSeconds % 60;
      if (totalSeconds === 0) {
        this.timeUp = true;
        this.timerSubscription.unsubscribe();
      }
    });
  }
}

