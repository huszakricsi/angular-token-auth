import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from 'src/app/auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public tokenAuthService:Angular2TokenService) { }

  ngOnInit() {
  }

}
