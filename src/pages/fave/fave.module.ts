import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavePage } from './fave';

@NgModule({
  declarations: [
    FavePage,
  ],
  imports: [
    IonicPageModule.forChild(FavePage),
  ],
})
export class FavePageModule {}
