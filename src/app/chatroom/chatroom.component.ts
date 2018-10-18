import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { MatDialog } from '@angular/material/dialog';
import { UserPickerDialogComponent } from '../user-picker-dialog/user-picker-dialog.component';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    // this.scrollable.elementScrolled().subscribe(a=>{
    //   console.log("chat scrolled");
    //   console.log(a);
    // });
  } 

  overview_channel: Channel;

  conversation_channel: Channel;
  
  conv_title = "";

  conversation:any;

  user_to_user:any;

  current_message="";

  messages = [];

  users_in_room = [];

  users= [];

  conversations = [];

  @ViewChild(CdkScrollable) scrollable: CdkScrollable; 

  constructor(public angular2TokenService:Angular2TokenService, private http: HttpClient, private cableService: ActionCableService, public dialog: MatDialog, public scroll: ScrollDispatcher) { }
 
  ngOnInit() {
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
        this.users=res['users'];
      },
      err =>{
        console.log(err);
      }
    );
    this.overview_channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('ChatroomsChannel');
    this.overview_channel.received().subscribe(res=>{
      console.log(res);
      let chatrooms_pub=[];
      let chatrooms_priv=[];
      for (let entry of res['YourRooms']) {
          if(entry.identifier.includes(":")===true){
            chatrooms_priv.push(entry);
          }
          else{
            chatrooms_pub.push(entry);
          }
        }
      console.log(res);
      this.user_to_user=chatrooms_priv;
      this.conversations=chatrooms_pub;
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
  OpenUserConversation(user):void{
    if(this.conversation_channel!=null){
      this.conversation_channel.unsubscribe();
      this.conversation=null;
    }
    this.conversation_channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('MessagesChannel',{type:"userchat",user: user});
    this.conversation_channel.received().subscribe(res=>{
      console.log(res);
      this.messages=res['messages'];
      this.users_in_room=res['users'];
      this.conversation=this.finduserconversationbyuser(user);
      this.conv_title=this.getUserNameById(user.id);
      var millisecondsToWait = 100;
      setTimeout(this.scrolltolast, millisecondsToWait);
    });
  }
  logit(){
    console.log(this.messages);
  }
  scrolltolast(){
    let el:HTMLElement = document.getElementById("come_my_friend");
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  finduserconversationbyuser(user):any{
    let identifier="";
    if (user["id"]<this.angular2TokenService.currentUserData.id) {
      identifier=user["id"]+":"+this.angular2TokenService.currentUserData.id;
    }
    else {
      identifier=this.angular2TokenService.currentUserData.id+":"+user["id"];
    }
    for (let entry of this.user_to_user) {
      if(entry.identifier===identifier){
        return entry;
      }
    }
  }
  Open(conversation):void{
    if(this.conversation_channel!=null){
      this.conversation_channel.unsubscribe();
    }
    this.conv_title=conversation.identifier;
    this.conversation=conversation;
    this.conversation_channel = this.cableService.cable("ws://localhost:3000/cable?access-token="+this.angular2TokenService.currentAuthData.accessToken+"&client="+this.angular2TokenService.currentAuthData.client+"&uid="+this.angular2TokenService.currentAuthData.uid).channel('MessagesChannel',{type:"chatroom",conversation: conversation});
    this.conversation_channel.received().subscribe(res=>{
      console.log(res);
      this.messages=res['messages'];
      this.users_in_room=res['users'];
      this.scrolltolast();
      var millisecondsToWait = 100;
      setTimeout(this.scrolltolast, millisecondsToWait);
    });
  }  
  Delete(conversation):void{
    if(this.conversation!=null&&this.conversation_channel!=null&&this.conversation.id==conversation.id){
      this.conversation_channel.unsubscribe();
      this.conversation_channel=null;
      this.conversation=null;
    }
    this.overview_channel.perform("delete_Room",{chatroom_id: conversation.id});
  }  
  DeleteMessage(message):void{
    this.conversation_channel.perform("delete_Message",{message_id: message.id, conversation: this.conversation});
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
    for (let entry of this.users_in_room) {
        if (entry.id==id){
          if(entry.name!=""&&entry.name!=null){
            ret = entry.name;
          }
          else{
            ret = entry.uid;
          }
          if(entry.nickname!=""&&entry.nickname!=null){
            ret+= " ("+entry.nickname+")";
          }
        }
    }
    return ret;
  }

}
