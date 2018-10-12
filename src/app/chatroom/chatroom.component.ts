import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { MatDialog } from '@angular/material/dialog';
import { UserPickerDialogComponent } from '../user-picker-dialog/user-picker-dialog.component';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  overview_channel: Channel;

  conversation_channel: Channel;
  
  conversation:any;

  current_message="";

  messages = [];

  users = [];

  conversations = [];

  constructor(public angular2TokenService:Angular2TokenService, private http: HttpClient, private cableService: ActionCableService, public dialog: MatDialog) { }

  ngOnInit() {
    this.overview_channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('ChatroomsChannel');
    this.overview_channel.received().subscribe(res=>{
      console.log(res);
      this.conversations=res['YourRooms'];
    });
  }
  CreateChatroom():void{
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.angular2TokenService.currentAuthData.accessToken,
        'expiry': this.angular2TokenService.currentAuthData.expiry,
        'token-type': this.angular2TokenService.currentAuthData.tokenType,
        'uid': this.angular2TokenService.currentAuthData.uid,
        'client': this.angular2TokenService.currentAuthData.client
      })
    };

    this.http.get("http://localhost:3000/users",httpOptions).subscribe(
      res =>{
        res=res['users'];
        console.log(res);
        let opened_dialog=this.dialog.open(UserPickerDialogComponent,{data: res});
        opened_dialog.afterClosed().subscribe(result => {
          console.log(result);
          this.overview_channel.perform("create_Room",result);
        });
      },
      err =>{
        console.log(err);
      }
    );
  }
  Open(conversation):void{
    this.conversation=conversation;
    this.conversation_channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('MessagesChannel',{conversation: conversation});
    this.conversation_channel.received().subscribe(res=>{
      console.log(res);
      this.messages=res['messages'];
      this.users=res['users'];
    });
  }  
  onKeyUp(event:any){
    if(event.keyCode == 13){
      this.sendMessage();
    }else{
    }
 }
  sendMessage(): void {
    this.conversation_channel.perform("receive",{conversation: this.conversation, message:this.current_message});
    this.current_message="";
  }
  getUserNameById(id:number):string{
    let ret="";
    for (let entry of this.users) {
        if (entry.id==id){
          if(entry.name!=""){
            ret = entry.name;
          }
          else{
            ret = entry.uid;
          }
        }
    }
    return ret;
  }
}
