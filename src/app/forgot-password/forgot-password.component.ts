import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  
  forgotFrom !: FormGroup;
  email: string = '';
  loading:boolean = false;

  constructor(private fb:FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackbarService,
    private toaster: ToastrService
  ){}
  
  ngOnInit(): void
  {
    this.forgotFrom=this.fb.group({
      email: ['',[Validators.required, 
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]]          
    })
  }
     
  
  async onSubmit() {
    if(this.forgotFrom.invalid){
      return;
    }

    // this.loading = true;

    console.log(this.forgotFrom.value.email);
    const email = this.forgotFrom.value.email;
    try {
      const res = await firstValueFrom(this.userService.sendOtp(email));
      console.log(res);
      this.router.navigate(['otp-validation'], { queryParams: { email } });
      this.toaster.info("OTP has been sent to your email");
    } catch (err) {
      console.log("Error occurred", err);
      alert('Error occurred while sending OTP!');
    }
    // finally{
    //   this.loading = false;
    // }
  }
    
}