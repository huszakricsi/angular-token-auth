import { Component, OnInit } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
  signupuser:any = {};

  constructor() { }

  ngOnInit() {
  }

}
