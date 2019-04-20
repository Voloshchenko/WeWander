import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { CardsPage } from '../cards/cards';
import { MyMapPage } from '../my-map/my-map';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {
  city 

  settings = SettingsPage;
  cards = CardsPage;
  map = MyMapPage
  

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams) {
  	     this.city = this.navParams.data
  }

  ionViewDidLoad() {this.navCtrl.push(TabsPage, this.city)}
  toNavBar(){
      this.navCtrl.pop();
  }
}
