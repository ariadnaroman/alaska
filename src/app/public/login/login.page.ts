import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {NavController, ToastController} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string = "";
    password: string = "";

    constructor(private authService: AuthenticationService, public toastController: ToastController,
                public navCtrl: NavController) {
    }

    ngOnInit() {
    }

    async login() {
        try {
            await this.authService.login(this.username, this.password);
            this.username = "";
            this.password = "";
        } catch (e) {
            if (e.response && e.response.data && e.response.data.issue && e.response.data.issue.length > 0) {
                const toast = await this.toastController.create({
                    message: e.response.data.issue[0].error,
                    duration: 3000
                });
                toast.present();
                this.username = "";
                this.password = "";
            } else if (e.message) {
                const toast = await this.toastController.create({
                    message: e.message,
                    duration: 3000
                });
                toast.present();
                this.username = "";
                this.password = "";
            }
        }
    }
}
