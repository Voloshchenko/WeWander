import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { WorkingHoursProvider } from '../../providers/working-hours/working-hours';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities = [
    {key:"5",
    name: "Barcelona",
    img:"assets/city_icons/barcelona.jpg",
    coord:[41.381514, 2.172830]
    },
    {key:"6",
    name: "Moscow",
    img:"assets/city_icons/barcelona.jpg",
    coord:[41.381514, 2.172830]
    },
    {key:"7",
    name: "Milan",
    img:"assets/city_icons/barcelona.jpg",
    coord:[41.381514, 2.172830]
    },                 
  ]

  searchResults = []
  myCities
  searchbar 

  constructor(public navCtrl: NavController,
              public favorite: FavoritesProvider,
              public workingHours: WorkingHoursProvider) {}

  ionViewWillEnter() {
    this.favorite.getMyCities();
  }  

  showCity(city){
    this.favorite.emptyArray()
    this.navCtrl.push(TabsPage, city)
  }

  addCity(city){
    this.favorite.addCity(city)
    this.favorite.getMyCities()
    this.searchbar=""
    this.searchResults = []
  }

  deleteCity(city){
    let title = "Delete " + city.city.name
    let message = "Do you want to delete " + city.city.name + " and all your favorite places there?"
    let text = city.city.name + " was deleted."
    this.favorite.deleteConfirm(city, title, message, text)

  }

// filter cities
  filterCities(val){ 
    this.cities.forEach(city=>{
      city["added"]=false;
    })
    if (!val || val=="") {
      return this.searchResults = [];
    }
    this.searchResults = this.cities.filter((city) => {
      if(city.name && val) {
        return city.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      }
    });
    this.searchResults.forEach(city => {
      for(let i=0; i<this.favorite.myCities.length; i++){
        if(city.name == this.favorite.myCities[i].city.name){
          city["added"]= true;        
        }
      }
    })
  }  
}
