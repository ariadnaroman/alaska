import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../services/song.service";

@Component({
    selector: 'app-song',
    templateUrl: './song.page.html',
    styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
    id: string = null;
    artist: string = "";
    title: string = "";

    isFavourite: boolean = false;

    recommendations = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private songService: SongService) {
    }

    async ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        let response = await this.songService.getRecommendations(this.id);
        this.artist = response.data.song.artist_name;
        this.title = response.data.song.track_name;
        this.recommendations = response.data.recommendations;

        this.isFavourite = await this.songService.isSongFavouriteForCurrentUser(this.id);
    }

    async goTo(song) {
        await this.router.navigate(['private/song/' + song.track_id]);
    }

    goToSpotify() {
        window.open(`https://open.spotify.com/track/${this.id}`, '_system', 'location=yes');
    }

    async addToPlaylist() {
        await this.songService.addSongToCurrentUsersPlaylist({
            track_id: this.id,
            artist_name: this.artist,
            track_name: this.title
        });
        this.isFavourite = true;
    }
}
