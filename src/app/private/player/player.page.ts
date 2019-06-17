import { Component, OnInit } from '@angular/core';
const SpotifyWebHelper = require('spotify-web-helper');

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  helper = SpotifyWebHelper();

  constructor() { }

  ngOnInit() {
    this.helper.player.on('error', err => {
      if (err.message.match(/No user logged in/)) {
        // also fires when Spotify client quits
      } else {
        // other errors: /Cannot start Spotify/ and /Spotify is not installed/
      }
    });
    this.helper.player.on('ready', () => {

      // Playback events
      this.helper.player.on('play', () => { });
      this.helper.player.on('pause', () => { });
      this.helper.player.on('seek', newPosition => {});
      this.helper.player.on('end', () => { });
      this.helper.player.on('track-will-change', track => {});
      this.helper.player.on('status-will-change', status => {});

      // Playback control. These methods return promises
      this.helper.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC');
      this.helper.player.pause();
      this.helper.player.seekTo(60); // 60 seconds

      // Get current playback status, including up to date playing position
      console.log(this.helper.status);
      // 'status': {
      //    'track': ...,
      //    'shuffle': ...,
      //    'playing_position': ...
      //  }

    });
  }

}
