import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})
export class AuthDialogComponent implements OnInit {
  @Input('auth-mode') authMode: 'login' | 'register' = 'login';

  constructor() { }

  ngOnInit() {
  }

}
