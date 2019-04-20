import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';

import { CardPage } from '../card/card';
import { MyMapPage } from '../my-map/my-map';


@IonicPage()
@Component({
  selector: 'page-fave',
  templateUrl: 'fave.html',
})
export class FavePage {
  favorites
  city

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              public favorite: FavoritesProvider,
              public modalCtrl: ModalController) {
  	this.city = this.navParams.data

  }

  ionViewWillEnter() {
    this.favorite.getFavorite(this.city)
  }

  public openCard(card){
    var modalPage = this.modalCtrl.create('CardPage', { card : card });
    modalPage.present();
  }

  visit(place){
    // this.favorite.visit(place)
    console.log("visited")
  }

  delete(place, index){     
    this.favorite.deleteFavePlace(place, index, this.city)    
  }  

  // Filter

  onInput(searchbar){
  var q = searchbar.srcElement.value;
  console.log(q)
  // if the value is an empty string don't filter the items
  if (!q || q=="") {
    this.favorite.getFavorite(this.city)
    return this.favorite.favorites;
  }

  this.favorite.favorites = this.favorite.favorites.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
   });    
  }

  // Navigation

  toMap(){
    this.navCtrl.pop()
  }

}
