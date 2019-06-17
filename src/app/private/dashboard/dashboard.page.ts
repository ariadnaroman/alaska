import {AuthenticationService} from "../../services/authentication.service";
import {Component, OnInit} from '@angular/core';
import {SongService} from "../../services/song.service";
import {MenuController} from "@ionic/angular";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    songs: any[] = [];
    page: number = 1;
    more: boolean = true;
    searchText: string  = "";
    username: string = "";

    constructor(private authService: AuthenticationService,
                private songService: SongService,
                private menu: MenuController) {
        console.log(this.authService);
        this.authService.getAuthenticatedUser().then(user => this.username = user.username);
    }

    async ngOnInit() {
        this.songs = [];
        this.getSongs(this.page);
    }

    async openFirst() {
        await this.menu.enable(true, 'first');
        await this.menu.open('first');
    }

    getSongs(page: number) {
        this.songService.getSongs(page).then((response) => {
            this.songs.push(...response.data.songs);
            this.more = response.data.more;
        });
    }

    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            if (this.searchText !== "") this.searchNext();
            else this.getSongs(this.page);
            event.target.complete();

            if (!this.more) {
                event.target.disabled = true;
            }
        }, 1000);
    }

    clear() {
        this.songs = [];
        this.getSongs(1);
    }

    search() {
        this.songService.getSongsByText(this.searchText).then((response) => {
            this.songs = response.data.songs;
            this.more = response.data.more;
            this.page = 1;
        });
    }

    searchNext() {
        this.songService.getSongsByText(this.searchText, this.page).then((response) => {
            this.songs.push(...response.data.songs);
            this.more = response.data.more;
        });
    }

    showFavorites() {

    }

    logout() {
        this.authService.logout();
    }
}
