import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  
  loginuser:any = {};

  constructor(private authToken: Angular2TokenService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  login(): void
  {
    this.authToken.signIn({email: this.loginuser.email, password: this.loginuser.password}).subscribe(

      res => {
        console.log(res);
      },

      err => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: "Can't login, check console for further informations!"});
        opened_dialog.afterClosed().subscribe(result => {console.log(result)});
      }
    );
  }
}
