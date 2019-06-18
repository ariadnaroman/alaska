import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
    {path: 'song/:id', loadChildren: './song/song.module#SongPageModule'},
    {path: 'favourites', loadChildren: './favourites/favourites.module#FavouritesPageModule'},  { path: 'player', loadChildren: './player/player.module#PlayerPageModule' }



];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PrivateRoutingModule {
}
