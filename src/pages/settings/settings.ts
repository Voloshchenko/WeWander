import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { CardsSettingsProvider } from '../../providers/cards-settings/cards-settings';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              public favorite: FavoritesProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private cardsSettings:CardsSettingsProvider) 
  {
      this.city = this.navParams.data       
  }

  ionViewWillEnter() {
    this.cardsSettings.getCardsSettings()          
  }

  toNavBar(){
    this.cardsSettings.setCardsSettings()      
    this.events.publish('user:logout')
  }

  ionViewWillLeave(){
    this.cardsSettings.setCardsSettings()
  }

}
