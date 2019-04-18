import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  async login() {
    await this.authService.login(this.username, this.password);
  }
}
