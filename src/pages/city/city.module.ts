import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityPage } from './city';

@NgModule({
  declarations: [
    CityPage,
  ],
  imports: [
    IonicPageModule.forChild(CityPage),
  ],
})
export class CityPageModule {}
