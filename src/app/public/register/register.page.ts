import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {NavController, ToastController} from '@ionic/angular';
import {isValidPassword, isValidUsername} from "../../shared/utils/utils";

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
        public navCtrl: NavController,
        private toastController: ToastController
    ) {
    }

    ngOnInit() {
    }

    async register() {
        if (!isValidUsername(this.username)) {
            const toast = await this.toastController.create({
                message: 'The username is not valid! Username must have at between 8 and 15 characters. Try again.',
                duration: 3000
            });
            toast.present();
            this.username = "";
        } else if (this.password !== this.confirmPassword) {
            const toast = await this.toastController.create({
                message: 'The confirmed password does not match the password! Try again.',
                duration: 3000
            });
            toast.present();
            this.password = "";
            this.confirmPassword = "";
        } else if  (!isValidPassword(this.password)) {
            const toast = await this.toastController.create({
                message: 'The password inserted is not valid! It should contain at least one digit, at least one lower case character, at least one upper case character and should have at least 8 characters in total (a-zA-z0-9). Try again.',
                duration: 6000
            });
            toast.present();
            this.password = "";
            this.confirmPassword = "";
        } else {
            try {
                await this.authService.register(this.username, this.password);
            } catch (e) {
                if (e.response && e.response.data && e.response.data.issue && e.response.data.issue.length > 0) {
                    const toast = await this.toastController.create({
                        message: e.response.data.issue[0].error,
                        duration: 3000
                    });
                    toast.present();
                    this.username = "";
                }
            }
        }
    }
}
