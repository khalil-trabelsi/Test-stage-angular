import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'close') {
    this.snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: "top"
    })
  }
}
