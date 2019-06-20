import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {Storage} from "@ionic/storage";
import {Platform} from "@ionic/angular";
const axios = require('axios');


const TOKEN_KEY = 'auth-token';
const USER = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    authenticationState = new BehaviorSubject(false);

    constructor(private storage: Storage, private plt: Platform) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    getAuthenticatedUser() {
        return this.storage.get(USER);
    }

    async login(username: string, password: string) {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
            username, password
        });
        await this.storage.set(USER, response.data.user);
        return this.storage.set(TOKEN_KEY, `Bearer ${response.data.token}`).then(() => {
            this.authenticationState.next(true);
        });
    }

    async register(username: string, password: string) {
        const response = await axios.post("http://localhost:3000/api/auth/signup", {
            username, password
        });
        await this.storage.set(USER, response.data.user);
        return this.storage.set(TOKEN_KEY, `Bearer ${response.data.token}`).then(() => {
            this.authenticationState.next(true);
        });
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

}
