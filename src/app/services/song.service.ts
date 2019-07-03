import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {serverHost} from "../../environments/environment";

const axios = require('axios');

const TOKEN_KEY = 'auth-token';
const USER = 'user';

@Injectable({
    providedIn: 'root'
})
export class SongService {
    serverIP: string = null;

    constructor(private storage: Storage) {
    }

    setServerIP(serverIP: string) {
        this.serverIP = serverIP;
    }

    async getSongs(page: number = 1) {
        const token = await this.storage.get(TOKEN_KEY);
        const headers = {
            'Authorization': token
        };
        try {
            return await axios.get(`${this.getServerHost()}/api/song?page=${page}`, {headers});
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
            return await axios.get(`${this.getServerHost()}/api/song?contains=${text}&page=${page}`, {headers});
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
            return await axios.get(`${this.getServerHost()}/api/song/${id}/recommendations`, {headers});
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
            return await axios.get(`${this.getServerHost()}/api/song?title=${song.track_name}&artist=${song.artist_name}`, {headers});
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async addSongToCurrentUsersPlaylist(song: any) {
        const token = await this.storage.get(TOKEN_KEY);
        const user = await this.storage.get(USER);
        const headers = {
            'Authorization': token
        };
        await axios.post(`${this.getServerHost()}/api/song/${user.username}/playlist`, {song}, {headers});
        user.songs.push(song);
        await this.storage.set(USER, user);
    }


    async isSongFavouriteForCurrentUser(id) {
        const user = await this.storage.get(USER);
        return !!user.songs.find(s => s.track_id === id);
    }

    private getServerHost() {
        return this.serverIP ? this.serverIP : serverHost;
    }
}
