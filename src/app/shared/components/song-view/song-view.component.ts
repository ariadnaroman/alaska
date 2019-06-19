import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.scss']
})
export class SongViewComponent implements OnInit {
  @Input()
  song: any;

  constructor() {}

  ngOnInit() {}
}
