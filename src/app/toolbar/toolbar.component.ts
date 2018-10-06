import { Component, OnInit} from '@angular/core';
import { AuthDialogComponent } from 'src/app/auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public tokenAuthService:Angular2TokenService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  openAuthDialog(mode: "login"| "register"){
    let authDialog = this.dialog.open(AuthDialogComponent,{data: {authmode: mode}});
  }
}
