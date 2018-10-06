import { Component, OnInit } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})

export class RegisterFormComponent implements OnInit {
  registerData: RegisterData = <RegisterData>{};

  constructor(private authToken: Angular2TokenService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  register(): void{
      console.log(this.registerData);
      this.authToken.registerAccount(this.registerData).subscribe(
        res => {
          console.log(res);
        },
  
        err => {
          let opened_dialog=this.dialog.open(MDialogComponent,{data: "Can't register, check console for further informations!"});
          opened_dialog.afterClosed().subscribe(result => {console.log(result)});
        }
    );
  }
}
