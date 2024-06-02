import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {
  
  hidePassword = true;

  resetPasswordForm!: FormGroup;
  email: string;
  otp: string;


  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.email = this.route.snapshot.queryParams['email'];
    this.otp = this.route.snapshot.queryParams['otp'];
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  onSubmit() {

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const newPassword = this.resetPasswordForm.value['newPassword'];

    this.userService.resetPassword(this.email, this.otp, newPassword)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['login']);
          this.toaster.success('Password Reset Successfully', 'Success');
        },
        error: (err: any) => {
          console.log("Error occurred", err);
          this.toaster.error('Error occurred while resetting password!','Error')
        }
      });
    }

}
