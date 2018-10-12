import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdata:any={};
  updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};

  constructor(public angular2TokenService:Angular2TokenService, public dialog: MatDialog, public authService:AuthService, private router:Router,private http: HttpClient) {
    this.updatePasswordData.passwordCurrent='';
    this.updatePasswordData.password='';
    this.updatePasswordData.passwordConfirmation='';
  }

  ngOnInit() {
  }

  updateProfile(): void{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.angular2TokenService.currentAuthData.accessToken,
        'expiry': this.angular2TokenService.currentAuthData.expiry,
        'token-type': this.angular2TokenService.currentAuthData.tokenType,
        'uid': this.angular2TokenService.currentAuthData.uid,
        'client': this.angular2TokenService.currentAuthData.client
      })
    };

    this.http.post("http://localhost:3000/profile/update",{name: this.userdata.name , nickname: this.userdata.nickname},httpOptions).subscribe(
      res =>{
            if( res['success']==true)
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
