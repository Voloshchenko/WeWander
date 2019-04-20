import { Injectable } from '@angular/core';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import PouchDB from "pouchdb";

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {DistanceProvider} from '../distance/distance'
import {CardsSettingsProvider} from '../cards-settings/cards-settings'
import {WorkingHoursProvider } from '../working-hours/working-hours';

@Injectable()
export class FavoritesProvider {
  private citiesDB 
  // new PouchDB("myCities")
  private allCardsDB; 
  // new PouchDB("all"+city)
  private favoritesDB;
  // new PouchDB(city)


  favorites = []
  city
  myCities = []
  allCards = []
  quit = false
  lastFavoriteCard
  rowlength = 1000000


  constructor(private storage: Storage,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public http: HttpClient,
              public distanceProvider: DistanceProvider,
              public cardsSettingsProvider: CardsSettingsProvider,
              public workingHours: WorkingHoursProvider) {}

// _____________CITIES_________________

//             Add city

  addCity(city){
    let text = "You've successfully added " + city.name;
    this.citiesDB = new PouchDB("myCities")
    this.citiesDB.put({
      _id:city.key,
      city: city
      }, (err, result)=>{
        if(!err){
          this.presentToast(text)
          this.saveAllCards(city.name)
        }
    }) 
  }

//             Load user cities

  getMyCities(){
    this.myCities = []
    this.citiesDB = new PouchDB("myCities")
    this.citiesDB.allDocs({include_docs:true}, (err, result) =>{      
      if(!err){
        let rows = result.rows;
        for (let i=0; i<rows.length; i++){
          this.myCities.push(rows[i].doc)       
        }
      }
    })
  }  

//             Remove city 

  deleteCity(city){
    this.allCardsDB = new PouchDB("all"+city.city.name) 
    this.allCardsDB.destroy() 
    this.favoritesDB = new PouchDB(city.city.name) 
    this.favoritesDB.destroy()           
    this.citiesDB = new PouchDB("myCities")  
    this.citiesDB.remove(city)   
    this.getMyCities()
  }



//____________ALL CITY CARDS________________

//         Generate initial stack 

  saveAllCards(city){
    this.allCardsDB = new PouchDB("all"+city) 
    this.http.get('assets/'+city.toLowerCase()+'/places.json')
      .subscribe(data => {
        for (var i = 0; i<data["places"].length; i++ ) {
          this.allCardsDB.post(data["places"][i], (err, result)=>{
            if(err){
              alert(err)
            }
          })
        }          
    })
  }

//     Load 20 cards when array is empty 

  getAllCards(city, cityCoord){  
    this.quit = false
    this.allCardsDB = new PouchDB("all"+city)
    this.allCards = [] 
    this.cardsSettingsProvider.getCardsSettings()
    let distanceFrom = cityCoord

    if(this.cardsSettingsProvider.startPointG == "myLocation"){  
        distanceFrom = [55.743099, 37.566738]
    } else if(this.cardsSettingsProvider.startPointG == "chosenLocation"){  
        distanceFrom = [55.749335, 37.875040]
    } 

    this.allCardsDB.allDocs({include_docs:true}, (err, result) =>{      
      if(!err){
        let rows = result.rows;
          for (let i=0; i<rows.length; i++){
            if(this.sortByType(rows[i].doc)){
              // calculating the distance
              let dis = this.distanceProvider.calculateDistance(rows[i].doc.coord, distanceFrom)
              rows[i].doc.dis = dis.toFixed(2)
              if(this.sortByDistance(rows[i].doc)){
                // if(rows[i].doc.workingHours){                   
                //   let status = this.workingHours.isOpen(rows[i].doc.workingHours)
                //   rows[i].doc.status = status        
                // }
               
                this.allCards.push(rows[i].doc)


              }              
            }
            if (this.allCards.length == 20) { break; }
          }  
          if(this.allCards.length == 0 ){
            this.quit = true
          }        
      }
    })   
  }

// Filters

// sort by distance

sortByDistance(place){
  if(place.dis<=this.cardsSettingsProvider.distanceG){
    return true
  }
}

// sort by type

sortByType(place){
  if(this.cardsSettingsProvider.food && place.food){
    return true
  }
  if(this.cardsSettingsProvider.drinks && place.drinks){
    return true
  }  

  if(this.cardsSettingsProvider.nightlife && place.nightlife){
    return true
  }  

  if(this.cardsSettingsProvider.attractions && place.attractions){
    return true
  } 

  if(this.cardsSettingsProvider.museums && place.museums){
    return true
  } 

  if(this.cardsSettingsProvider.parks && place.parks){
    return true
  }      
}



//              Repeat card

  returnCard(card, vote, city){
    this.allCardsDB = new PouchDB("all"+city)
    this.allCards.push(card)
    this.allCardsDB.post(card, (err, result)=>{
        if(!err){ }
    })   
    if(vote){
      this.favoritesDB = new PouchDB(city)
      this.favoritesDB.remove(this.lastFavoriteCard.id, this.lastFavoriteCard.rev)
    }    
  }

//       Remove card from all Cards stack 

  deleteCard(removedCard){
    this.allCardsDB.remove(removedCard)
  }  

  emptyArray(){
        this.allCards = []
  }

// ____________________FAVORITES_____________________________

//              Save card as the favorite 
 
  saveCard(city, place){
    this.favoritesDB = new PouchDB(city)    
    this.favoritesDB.put({
      _id:place.key,
      place: place
      }, (err, result)=>{
        this.lastFavoriteCard = result
        if(err){
          alert(err)
        }
      })
  }

//              Get array of favorite places

  getFavorite(city){
    this.favorites = []
    this.city = city    
    this.favoritesDB = new PouchDB(city) 
    this.favoritesDB.allDocs({include_docs:true}, (err, result) =>{      
      if(!err){
        let rows = result.rows;
        for (let i=0; i<rows.length; i++){
          this.favorites.push(rows[i].doc)       
        }
      }
    })
  }

//              Get promise of favorite places 

  getFavoritePromise(city){
    this.city = city 
    this.favoritesDB = new PouchDB(city)
    return this.favoritesDB.allDocs({include_docs:true}).then(result=>
      Promise.all(result.rows)
    )
  }

//              Change status of card - visited 

  visitedPouch(){}

//              Remove one place from favorite places 
  
  deleteFavePlace(place, index, city){ 
    this.favoritesDB = new PouchDB(city)
    this.favoritesDB.remove(place)
    this.favorites.splice(index, 1)
  }

//              Clear all favorite places 

  clearFavorite(city){
    this.favoritesDB = new PouchDB(city)
    this.favoritesDB.destroy()
  }

//______________Toasts and alerts__________________
  // Notification that places were deleted
  deleteConfirm(city, title, message, text) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteCity(city)
            this.presentToast(text)
          }
        }
      ]
    });
    alert.present();
  }  

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text ,
      duration: 1500,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {});
    toast.present();
  }

}