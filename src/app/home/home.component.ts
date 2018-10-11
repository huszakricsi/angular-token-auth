import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../services/auth.service';

import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActionCableService, Channel} from 'angular2-actioncable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  channel: Channel;
  constructor(public angular2TokenService:Angular2TokenService, public authService:AuthService, private cableService: ActionCableService) {}

  ngOnInit(){
  }
  
  // subANDsend():void { 
    //this.channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('MessagesChannel');
    //this.channel.received().subscribe(res=>{console.log(res);});
    //this.channel.perform("sendForPartner",{content:"message"});
  // }

}
