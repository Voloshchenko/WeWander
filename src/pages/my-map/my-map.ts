import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, ModalController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { CardPage } from '../card/card';
import { FavePage } from '../fave/fave';
import leaflet from 'leaflet';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-my-map',
  templateUrl: 'my-map.html',
})
export class MyMapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  cityName
  cityCoord
  favorites
  position = []
  currentPosition = []
  lat
  lng
  subscribtionMap
  humanPin
  coord

  food = true
  drinks = true
  nightlife = true
  attractions = true  
  museums = true
  parks = true

  showWindow =false
  card



  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              public events: Events,
              public platform: Platform,
              public favorite: FavoritesProvider,
              private geolocation: Geolocation,
              public modalCtrl: ModalController) {
  	this.cityCoord = this.navParams.data.coord
  }

  ionViewDidEnter() {
    this.geolocation.getCurrentPosition().then(pos=>{
      this.position = [pos.coords.latitude, pos.coords.longitude]
    }).catch(err=>console.log(err)).then(pos=>{this.addPosition()})    
    this.loadmap()
  }

  focusMyPosition(){
      this.map.setView(this.currentPosition, 14, { animation: true })
  }

  toList(){  
    // this.navCtrl.push(FavePage, this.navParams.data.name)
    this.showWindow = !this.showWindow
  }
 
//---------------Map-------------------------------------
  loadmap() {
    this.map = leaflet.map("map", {
        center: this.cityCoord,
        zoom: 14
    })
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.addMarkers() 
  }





// returns markers for all favs
  addMarkers(){
    this.favorite.getFavoritePromise(this.navParams.data.name)
    .then((fave)=>{


      for(var i=0; i<fave.length; i++){
        var cardInfo = fave[i].doc.place
        var marker = leaflet
        .marker(fave[i].doc.place.coord, 
          {icon:leaflet.icon
            ({iconUrl: fave[i].doc.place.img[0], iconSize: [30, 30], popupAnchor: [0, -15]})
          }
        )
        .addTo(this.map)
        marker._leaflet_id = cardInfo
        marker.on("click", (event) => {
          // this.openCard(event.target._leaflet_id)
          this.card = event.target._leaflet_id
          this.showWindow = true

        })
        this.map.on("click", (event) => {
          this.showWindow = false
        })

      }         
    })
  }

 openCard(card){
      var modalPage = this.modalCtrl.create('CardPage', { card : card });
      modalPage.present();
      console.log(card)
  }









// add your instant position and tracks your movements
  addPosition(){
    this.humanPin = leaflet.marker(this.position)
       this.humanPin.addTo(this.map)
    this.subscribtionMap = this.geolocation.watchPosition().subscribe(data=>{
        this.currentPosition = [data.coords.latitude, data.coords.longitude]
        this.humanPin.setLatLng(this.currentPosition)
      })   
    // console.log("here")        
  }

// delete place
  // delete(place){       
  //   this.favorite.removePlace(place)    
  // }

// delete map istance and kills tracking
  ionViewDidLeave(){
    this.subscribtionMap.unsubscribe()
    this.map.remove()
  }

    toNavBar(){
    this.events.publish('user:logout')   
  }

}
