import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async register() {
    if (this.password === this.confirmPassword)
      await this.authService.register(this.username, this.password);
  }
}
