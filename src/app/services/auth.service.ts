import { Injectable } from '@angular/core';
import {Angular2TokenService, RegisterData} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";


@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:Angular2TokenService) {

    this.authService.validateToken().subscribe(//should we only use subscribe().add(...) when we we implemented a function as observable?
      res => {
        if(res!=null)
        {
          res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false);
        }
      });
    }

  logOutUser():Observable<Response>{//should we only use subscribe().add(...) when we we implemented a function as observable?

    return this.authService.signOut().pipe(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(signUpData: RegisterData):Observable<Response>{
    return this.authService.registerAccount(signUpData).pipe(
        res => {
          return res;
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).pipe(
        res => {
          return res
        }
    );

  }

}
