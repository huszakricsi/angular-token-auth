import { Component, OnInit, Input } from '@angular/core';
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
  @Input() 
  set setParent(parent: AuthDialogComponent){
    this.parent=parent;
  }

  parent:AuthDialogComponent

  registerData: RegisterData = <RegisterData>{};

  constructor(private authToken: Angular2TokenService, public dialog: MatDialog) {
    this.registerData.email='';
   }

  ngOnInit() {
  }
  register(): void{
    if(this.registerData.email!=''||this.registerData.email==null)
    {
      this.authToken.registerAccount(this.registerData).subscribe(
        res => {
          console.log(res);
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
}
