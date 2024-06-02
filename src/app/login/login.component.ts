import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { StorageServiceService } from '../services/storage-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword = true;
  responseMessage = "Login Successful";


  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private toaster: ToastrService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    localStorage.setItem("email", this.loginForm.value.email);
    this.userService.login(this.loginForm.value).subscribe(({
      next: (res => {
        console.log(res);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          console.log(user);
          StorageServiceService.saveToken(res.jwt);
          StorageServiceService.saveUser(user);
          this.toaster.success('Login Successful', 'Success');
          this.router.navigate(['/dashboard']);
        }
        else {
          this.toaster.error('Login Failed', 'Error');
        }
      }),
      error: (err) => {
        this.toaster.error('Login Failed, Please check your credentials', 'Error');
      }
    }))
  }
}