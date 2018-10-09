import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import {Http, Response,Headers, RequestOptions, RequestMethod} from '@angular/http';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdata:any={};
  updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};

  constructor(public angular2TokenService:Angular2TokenService, public dialog: MatDialog, public http: Http, public authService:AuthService, private router:Router) {
    this.updatePasswordData.passwordCurrent='';
    this.updatePasswordData.password='';
    this.updatePasswordData.passwordConfirmation='';
  }

  ngOnInit() {
  }

  updateProfile(): void{
    let headers = new Headers({
      'access-token': this.angular2TokenService.currentAuthData.accessToken,
      'expiry': this.angular2TokenService.currentAuthData.expiry,
      'token-type': this.angular2TokenService.currentAuthData.tokenType,
      'uid': this.angular2TokenService.currentAuthData.uid,
      'client': this.angular2TokenService.currentAuthData.client
    });
    console.log(this.angular2TokenService.currentAuthData);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    options.withCredentials=true;
    this.http.post("http://localhost:3000/profile/update", {name: this.userdata.name , nickname: this.userdata.nickname}, options).subscribe(
      res =>{
        if( JSON.parse(res._body).success==true)
        {
          this.dialog.open(MDialogComponent,{data: 'User Data changed successfully!'});
          this.authService.logOutUser();
          this.router.navigate(['/']);
        }
        console.log(res);
      },
      err =>{
        this.dialog.open(MDialogComponent,{data: JSON.parse(err._body).errors});
        console.log(err);
      }
    );
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
