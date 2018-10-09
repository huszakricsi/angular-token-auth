import { Component, OnInit} from '@angular/core';
import { AuthDialogComponent } from 'src/app/auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  primary:string = "primary";

  constructor(public angular2TokenService:Angular2TokenService,public authService:AuthService, private router:Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  logOut(){
    this.authService.logOutUser().subscribe().add(() => this.router.navigate(['/']));
  }

  openAuthDialog(mode: "login"| "register"){
    let authDialog = this.dialog.open(AuthDialogComponent,{data: {authmode: mode}});
  }
}
