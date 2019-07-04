import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import {NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss']
})
export class SongPage implements OnInit {
  id: string = null;
  artist: string = '';
  title: string = '';

  isFavourite: boolean = false;

  recommendations = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    public navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    let response = await this.songService.getRecommendations(this.id);
    this.artist = response.data.song.artist_name;
    this.title = response.data.song.track_name;
    this.recommendations = response.data.recommendations;

    this.isFavourite = await this.songService.isSongFavouriteForCurrentUser(
      this.id
    );
  }

  async goTo(song) {
    await this.router.navigate(['private/song/' + song.track_id]);
  }

  goToSpotify() {
    window.open(
      `https://open.spotify.com/track/${this.id}`,
      '_system',
      'location=yes'
    );
  }

  async toggleForAddingOrRemovingSongInPlaylist() {
    if (!this.isFavourite) {
      await this.songService.addSongToCurrentUsersPlaylist({
        track_id: this.id,
        artist_name: this.artist,
        track_name: this.title
      });
      this.isFavourite = true;
      const toast = await this.toastController.create({
        message: 'Song added in playlist!',
        duration: 1000,
        color: "light"
      });
      toast.present();
    } else {
      await this.songService.deleteSongFromCurrentUsersPlaylist({
        track_id: this.id,
        artist_name: this.artist,
        track_name: this.title
      });
      this.isFavourite = false;
      const toast = await this.toastController.create({
        message: 'Song removed from playlist!',
        duration: 1000,
        color: "light"
      });
      toast.present();
    }
  }
}
