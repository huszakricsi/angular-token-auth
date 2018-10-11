import { Component, OnInit, Input } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { RegisterData } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../m-dialog/m-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})

export class RegisterFormComponent implements OnInit {
  @Input() 
  set setParent(parent: AuthDialogComponent){
    this.parent=parent;
  }

  parent:AuthDialogComponent

  registerData: RegisterData = <RegisterData>{};

  constructor(public authService:AuthService, public dialog: MatDialog) {
    this.registerData.email='';
   }

  ngOnInit() {
  }
  register(): void{
    if(this.registerData.email!=''||this.registerData.email==null)
    {
      this.authService.registerUser(this.registerData).subscribe(
        res => {
          console.log(res);
          this.authService.userSignedIn$.next(true);
          this.parent.dialogRef.close();
        },

        err => {
          let opened_dialog=this.dialog.open(MDialogComponent,{data: JSON.parse(err._body).errors.full_messages});
          opened_dialog.afterClosed().subscribe(result => {console.log(err)});
        }
      );
    }
    else{
      this.dialog.open(MDialogComponent,{data: "Email field can not be empty."});
    }
  }
  onKeyUp(event:any){
    if(event.keyCode == 13){
      this.register();
    }else{
    }
 }
}
