import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Angular2TokenService } from 'angular2-token';
import { AuthService } from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";

import { HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';//picked my ones :D
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { MDialogComponent } from './m-dialog/m-dialog.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ActionCableService } from 'angular2-actioncable';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { UserPickerDialogComponent } from './user-picker-dialog/user-picker-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MDialogComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    ChatroomComponent,
    UserPickerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,

    //angular material
    BrowserAnimationsModule,
    //imported material components:
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,

    //imported cdk components
    ScrollDispatchModule 
  ],
  entryComponents: [
    MDialogComponent,
    AuthDialogComponent,
    UserPickerDialogComponent
  ],
  providers: [ 
    Angular2TokenService,
    AuthService,
    AuthGuard,
    ActionCableService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
