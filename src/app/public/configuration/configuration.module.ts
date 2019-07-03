import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ConfigurationPage} from './configuration.page';
import {IconsModule} from "../../icons/icons.module";

const routes: Routes = [
    {
        path: '',
        component: ConfigurationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        IconsModule
    ],
    declarations: [ConfigurationPage]
})
export class ConfigurationPageModule {
}
