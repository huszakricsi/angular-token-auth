import { Injectable }     from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";

@Injectable()
export class MobileGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService,
              private router:Router){}

  canActivate() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.router.navigate(['/mobilechatroom']);
      return false;
    }else{
      return true;
    }
  }
}
