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

    recommendations = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private songService: SongService) {
    }

    async ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        let response = await this.songService.getRecommendations(this.id);
        this.artist = response.data.song.artist;
        this.title = response.data.song.title;
        this.recommendations = response.data.recommendations.filter(elem => elem.title !== this.title);
    }

    async goTo(song) {
        let response = await this.songService.getId(song);
        await this.router.navigate(['private/song/' + response.data.song._id]);
    }


}
