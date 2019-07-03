import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {SongService} from "../../services/song.service";
import {NavController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  ip: string = "";
  port: string = "";

  constructor(private authService: AuthenticationService, private songService: SongService,
              public navCtrl: NavController, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  async save() {
    this.authService.setServerIP(`http://${this.ip}:${this.port}`);
    this.songService.setServerIP(`http://${this.ip}:${this.port}`);
    const toast = await this.toastController.create({
      message: 'The configuration is saved!',
      duration: 2000
    });
    toast.present().then(() => {
      this.navCtrl.pop();
    })
  }

}
