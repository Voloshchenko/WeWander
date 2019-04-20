import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Slides,LoadingController,  ModalController } from 'ionic-angular';
import 'rxjs/Rx';
import {
  StackConfig,  
  // Stack,  Card,  ThrowEvent, 
   DragEvent,  SwingStackComponent, SwingCardComponent} from 'angular2-swing';

import { SettingsPage } from '../settings/settings';
import { MyMapPage } from '../my-map/my-map';
import { CardPage } from '../card/card';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import {CardsSettingsProvider} from '../../providers/cards-settings/cards-settings'

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {  

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  stackConfig: StackConfig;
  recentCard: string = '';

  city
  cityCoords
  map = MyMapPage
  settings = SettingsPage;
  removedCard
  vote


  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              public events: Events,
              public favorite: FavoritesProvider,
              public http: HttpClient,
              public cardsSettings: CardsSettingsProvider,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController) {
  	this.city = this.navParams.data.name
    this.cityCoords = this.navParams.data.coord
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  public openCard(card){
      var modalPage = this.modalCtrl.create('CardPage', { card : card });
      modalPage.present();
  }
  

  ionViewDidEnter() {
    this.cardsSettings.getCardsSettings()
    this.addNewCards()
  }

   ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

// Called whenever we drag an element
onItemMove(element, x, y, r) {
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16*16 - abs, 16*16));
  let hexCode = this.decimalToHex(min, 2);  
  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }
  
  element.style.background = color;
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
}
 
// Connected through HTML
  voteUp(like: boolean) {
    this.removedCard = this.favorite.allCards.pop();    
    if (like) {
      this.vote = true
      this.favorite.saveCard(this.city, this.removedCard)      
      this.favorite.deleteCard(this.removedCard)
      if(this.favorite.allCards.length == 0){
        if(this.favorite.quit == false){
          this.addNewCards()   
        } else{
          // alert ("out of cards")
        }
      }
    } else {
      this.vote = false      
      this.favorite.deleteCard(this.removedCard)
      if(this.favorite.allCards.length == 0){
        if(this.favorite.quit == false){ 
          this.addNewCards()              
        } else{
          // alert ("out of cards")
      }
      } 
    }      
  }
 
// Add new cards to our array
  addNewCards() {
    this.favorite.getAllCards(this.city, this.cityCoords)

  }
 
// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;  
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }

  returnCard(){
    this.favorite.returnCard(this.removedCard, this.vote, this.city)    
    this.removedCard = ''
  }

  complainPlace(){
    console.log("complaint")
  }

  toNavBar(){
    this.events.publish('user:logout')   
  }



  
}
