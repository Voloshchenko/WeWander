import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMapPage } from './my-map';

@NgModule({
  declarations: [
    MyMapPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMapPage),
  ],
})
export class MyMapPageModule {}
