import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongViewComponent } from './components/song-view/song-view.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SongViewComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [SongViewComponent]
})
export class SharedModule {}
