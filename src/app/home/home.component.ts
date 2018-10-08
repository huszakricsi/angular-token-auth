import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public angular2TokenService:Angular2TokenService, public authService:AuthService) { }

  ngOnInit() {
  }

}
