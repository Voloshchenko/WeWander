import { Component } from '@angular/core';
import { NavParams, NavController, Events } from 'ionic-angular';

import { CardsPage } from '../cards/cards';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { MyMapPage } from '../my-map/my-map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  cityCoord
  city
  home = HomePage;
  cards = CardsPage;
  map = MyMapPage
  settings = SettingsPage;
  cityData

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events) {
     this.cityData = this.navParams.data
     this.city = this.navParams.data.name
     events.subscribe('user:logout', ()=>{
       this.navCtrl.popToRoot();
     })

  }

  toNavBar(){
    this.navCtrl.pop();
  }
}
