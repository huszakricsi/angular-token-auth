import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import {Http, Response, RequestOptions} from '@angular/http';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdata:any={};
  updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};

  constructor(public angular2TokenService:Angular2TokenService, public dialog: MatDialog) {
    this.updatePasswordData.passwordCurrent='';
    this.updatePasswordData.password='';
    this.updatePasswordData.passwordConfirmation='';
  }

  ngOnInit() {
  }

  changePassword(): void{
    this.angular2TokenService.updatePassword(this.updatePasswordData).subscribe(
      res => {
        console.log(res);
        this.dialog.open(MDialogComponent,{data: "Password changed succesfully!"});
        this.updatePasswordData.passwordCurrent='';
        this.updatePasswordData.password='';
        this.updatePasswordData.passwordConfirmation='';
      }, error => {
        this.dialog.open(MDialogComponent,{data: JSON.parse(error._body).errors.full_messages});
      }
    );
  }
}
