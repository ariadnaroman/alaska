import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

const axios = require('axios');

const TOKEN_KEY = 'auth-token';
const USER = 'user';

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
            return await axios.get(`http://localhost:3000/api/song?title=${song.track_name}&artist=${song.artist_name}`, {headers});
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
        await axios.post(`http://localhost:3000/api/song/${user.username}/playlist`, {song}, {headers});
        user.songs.push(song);
        await this.storage.set(USER, user);
    }


    async isSongFavouriteForCurrentUser(id) {
        const user = await this.storage.get(USER);
        return !!user.songs.find(s => s.track_id === id);
    }
}
