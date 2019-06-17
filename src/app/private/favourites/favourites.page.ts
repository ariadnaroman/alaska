import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  songs: any[] = [];

  constructor(private authService: AuthenticationService) {
    this.authService.getAuthenticatedUser().then(user => this.songs = user.songs);
  }

  ngOnInit() {
  }

}
