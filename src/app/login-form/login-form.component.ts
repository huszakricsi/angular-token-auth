import { Component, OnInit, Input } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  @Input() 
  set setParent(parent: AuthDialogComponent){
    this.parent=parent;
  }

  parent: AuthDialogComponent;

  loginuser:any = {};

  constructor(private authToken: Angular2TokenService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  login(): void
  {
    this.authToken.signIn({email: this.loginuser.email, password: this.loginuser.password}).subscribe(

      res => {
        console.log(res);
        this.parent.dialogRef.close();
      },

      err => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: JSON.parse(err._body).errors});
        opened_dialog.afterClosed().subscribe(result => {console.log(err)});
      }
    );
  }
}
