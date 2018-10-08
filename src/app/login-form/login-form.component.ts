import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(public authService:AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  login(): void
  {
    this.authService.logInUser({email: this.loginuser.email, password: this.loginuser.password}).subscribe(

      res => {
        console.log(res);
        this.authService.userSignedIn$.next(true);
        this.parent.dialogRef.close();
      },

      err => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: JSON.parse(err._body).errors});
        opened_dialog.afterClosed().subscribe(result => {console.log(err)});
      }
    );
  }
}