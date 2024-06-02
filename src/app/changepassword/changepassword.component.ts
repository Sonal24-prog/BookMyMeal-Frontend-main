import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  hide = true;
  type = 'password';
  submitted = false;
  changePassword!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    return newPassword === confirmPassword ? null : { mismatch: false };
  }

  async onSubmit() {
    this.submitted = true;

    if (this.changePassword.invalid) {
      console.log('Form is invalid', this.changePassword.errors);
      this.logFormErrors(this.changePassword);
      return;
    }

    const { email, oldPassword, newPassword } = this.changePassword.value;
    try {
      console.log('Sending request to change password...');
      const res = await firstValueFrom(this.service.changePassword(email, oldPassword, newPassword));

      console.log('Response received:', res);
      this.snackbar.openSnackBar('Password has been changed successfully!', 'Close', {
        panelClass: 'success-snackbar'
      });
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Error changing password:', err);
      this.snackbar.openSnackBar('Error occurred while changing password', 'Close', {
        panelClass: 'error-snackbar',
      });
    }
  }

  logFormErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        console.log(`Key: ${key}, Errors: `, controlErrors);
      }
    });
  }

  get f() {
    return this.changePassword.controls;
  }
}
