import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import {Http, Response, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdata:any={};

  constructor(public angular2TokenService:Angular2TokenService,) {
  }

  ngOnInit() {
  }
}
