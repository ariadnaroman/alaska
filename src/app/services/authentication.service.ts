import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {Storage} from "@ionic/storage";
import {Platform} from "@ionic/angular";
const crypto = require('crypto');
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
        const salt = AuthenticationService.generateSalt();
        const encryptedPassword = AuthenticationService.sha512EncryptPassword(password, salt);
        const response = await axios.post("http://localhost:3000/api/auth/signup", {
            username, password: encryptedPassword, salt
        });
        await this.storage.set(USER, response.data.user);
        return this.storage.set(TOKEN_KEY, `Bearer ${response.token}`).then(() => {
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

    encrypt(password) {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), key: key.toString('hex'), password: encrypted.toString('hex') };
    }


    static generateSalt() {
        return crypto.randomBytes(8).toString('hex').slice(0, 16);
    }

    static sha512EncryptPassword(password: string, salt: string) {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    }
}
