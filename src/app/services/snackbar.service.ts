import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      ...config
    });
  }


  // constructor(private snackBar: MatSnackBar) { }

  // openSnackBar(message: string, action: string){
  //   if(action === 'error'){
  //     this.snackBar.open(message, '', {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       duration: 2000,
  //       panelClass: ['red-snackbar'],
  //     });
  //   }
  //   else{
  //     this.snackBar.open(message, '', {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       duration: 2000,
  //       panelClass: ['green-snackbar'],
  //     });
  //   }
  // }
}
