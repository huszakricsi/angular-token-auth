import { Component } from '@angular/core';

import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from './m-dialog/m-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-token-auth';
  opened_dialog: any;
  constructor(private authToken: Angular2TokenService, public dialog: MatDialog){
    this.authToken.init(environment.token_auth_config);
  }
  success_login(): void {
    this.authToken.signIn({email: "user@mail.net", password: "secretpassword"}).subscribe(

      res => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: res._body});
        opened_dialog.afterClosed().subscribe(result => {console.log(result)});
      },

      err => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: err._body});
        opened_dialog.afterClosed().subscribe(result => {console.log(result)});
      }
    );
  }
  failure_login(): void {
    this.authToken.signIn({email: "lol@bad.com", password: "wontwork"}).subscribe(

      res => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: res._body});
        opened_dialog.afterClosed().subscribe(result => {console.log(result)});
      },

      err => {
        let opened_dialog=this.dialog.open(MDialogComponent,{data: err._body});
        opened_dialog.afterClosed().subscribe(result => {console.log(result)});
      }
    );
  }
  test_dialog(): void {
    let opened_dialog=this.dialog.open(MDialogComponent,{data:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet metus vitae nibh condimentum, ut finibus justo tincidunt. Nam metus elit, maximus nec purus et, tempus tempor est. In hac habitasse platea dictumst. Curabitur sodales metus non eros rhoncus, ut ornare eros condimentum. Sed mollis, ante ut posuere euismod, mi leo ultricies ipsum, vitae tristique orci nibh ac turpis. Nulla vel varius enim. Quisque tristique libero nisl, id congue est dapibus at. Curabitur non mattis mi. Nunc volutpat posuere augue, eu tempor orci. Morbi commodo mauris magna, convallis vestibulum augue mollis in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam pretium erat enim, eu gravida nibh tempor dictum. Sed maximus, augue sed blandit pellentesque, metus sem pharetra urna, eget pharetra quam arcu vitae velit. Ut nec pharetra magna. Suspendisse blandit efficitur metus, eu pulvinar ligula congue eu. Phasellus vel tempus dui.'
    });
    opened_dialog.afterClosed().subscribe(result => {console.log(result)});
  }
}
