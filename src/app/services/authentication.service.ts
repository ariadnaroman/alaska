import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {Storage} from "@ionic/storage";
import {Platform} from "@ionic/angular";
import {serverHost} from "../../environments/environment";
const axios = require('axios');


const TOKEN_KEY = 'auth-token';
const USER = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    authenticationState = new BehaviorSubject(false);
    serverIP = null;

    constructor(private storage: Storage, private plt: Platform) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    setServerIP(serverIP: string) {
        this.serverIP = serverIP;
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
        try {
            const response = await axios.post(`${this.getServerHost()}/api/auth/login`, {
                username, password
            });
            await this.storage.set(USER, response.data.user);
            return this.storage.set(TOKEN_KEY, `Bearer ${response.data.token}`).then(() => {
                this.authenticationState.next(true);
            });
        } catch (e) {
            throw e;
        }
    }

    async register(username: string, password: string) {
        try {
            const response = await axios.post(`${this.getServerHost()}/api/auth/signup`, {
                username, password
            });
            await this.storage.set(USER, response.data.user);
            return this.storage.set(TOKEN_KEY, `Bearer ${response.data.token}`).then(() => {
                this.authenticationState.next(true);
            });
        } catch (e) {
            throw e;
        }
    }

    private getServerHost() {
        return this.serverIP ? this.serverIP : serverHost;
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
