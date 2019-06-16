import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

const axios = require('axios');

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class SongService {

    constructor(private storage: Storage) {
    }

    async getSongs(page: number = 1) {
        const token = await this.storage.get(TOKEN_KEY);
        const headers = {
            'Authorization': token
        };
        try {
            return await axios.get(`http://localhost:3000/api/song?page=${page}`, {headers});
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getSongsByText(text: string, page: number = 1) {
        const token = await this.storage.get(TOKEN_KEY);
        const headers = {
            'Authorization': token
        };
        try {
            return await axios.get(`http://localhost:3000/api/song?contains=${text}&page=${page}`, {headers});
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getRecommendations(id: string) {
        const token = await this.storage.get(TOKEN_KEY);
        const headers = {
            'Authorization': token
        };
        try {
            return await axios.get(`http://localhost:3000/api/song/${id}/recommendations`, {headers});
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getId(song: any) {
        const token = await this.storage.get(TOKEN_KEY);
        const headers = {
            'Authorization': token
        };
        try {
            return await axios.get(`http://localhost:3000/api/song?title=${song.title}&artist=${song.artist}`, {headers});
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
