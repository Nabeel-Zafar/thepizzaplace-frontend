import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
// import { ToastComponent } from '../../src/app/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  configSuccess: MatSnackBarConfig = {
    panelClass: ['snackbar-warning'],
    duration: 500000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom'
  };

  open (message:string,action:string) {
    this.snackBar.openFromComponent(ToastComponent, {
      duration: 2000,
      data: {
        message,
        dismiss:()=>{
          this.snackBar.dismiss;
        }
      },
      panelClass:['snackbar-'+action],
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    });
  }
  
}
