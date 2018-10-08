import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {//home component is the default route
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {//and added to root the home path to HomeComponent
    path: 'home',
    component: HomeComponent
  },
  {//added the profile path to profile component
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
