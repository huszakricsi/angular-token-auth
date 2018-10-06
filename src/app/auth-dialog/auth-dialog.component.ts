import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';

export interface DialogData {
  authmode: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})

export class AuthDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    
     }

  ngOnInit() {
  }

}
