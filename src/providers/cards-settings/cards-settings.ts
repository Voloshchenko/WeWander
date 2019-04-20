import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class CardsSettingsProvider {	
  startPointG
  distanceG

  // Categories 
  all = false
  food
  drinks
  nightlife
  attractions  
  museums
  parks

	constructor(private storage: Storage,
           		public http: HttpClient) {  }

	setCardsSettings(){	
		this.storage.ready().then(() => {
			this.storage.set('startPointG', this.startPointG);
			this.storage.set('distanceG', this.distanceG);
			this.storage.set('food', this.food);
			this.storage.set('drinks', this.drinks);
			this.storage.set('nightlife', this.nightlife);	  	  
			this.storage.set('attractions', this.attractions);
			this.storage.set('museums', this.museums);
			this.storage.set('parks', this.parks);	  	  
		});
	}

	getCardsSettings(){	
		this.storage.ready().then(() => {  	
			this.storage.get('startPointG').then((startPointG) => {
			    if(startPointG == undefined){
			      this.startPointG = "chosenLocation"
			    } else {
			    	this.startPointG = startPointG
			    }
			});

			this.storage.get('distanceG').then((distanceG) => {  	
			    if(distanceG == undefined){
			      this.distanceG = 10
			    } else {
			      this.distanceG = distanceG
			    }  	
			});

			this.storage.get('food').then((food) => {  	
			    if(food == undefined){
			      this.food = true
			    } else {
			      this.food = food
			    }  	
			});

			this.storage.get('drinks').then((drinks) => {  	
			    if(drinks == undefined){
			      this.drinks = true
			    } else {
			      this.drinks = drinks
			    }  	
			});

			this.storage.get('nightlife').then((nightlife) => {  	
			    if(nightlife == undefined){
			      this.nightlife = true
			    } else {
			      this.nightlife = nightlife
			    }  	
			});

			this.storage.get('attractions').then((attractions) => {  	
			    if(attractions == undefined){
			      this.attractions = true
			    } else {
			      this.attractions = attractions
			    }
			});

			this.storage.get('museums').then((museums) => {  	
			    if(museums == undefined){
			      this.museums = true
			    } else {
			      this.museums = museums
			    }
			});

			this.storage.get('parks').then((parks) => {  	
			    if(parks == undefined){
			      this.parks = true
			    } else {
			      this.parks = parks
			    }
			});

		});
	}		
}


			// this.storage.get('drinks').then((drinks) => {  	
			//     if(drinks == undefined){
			//       this.drinks = true
			//     } else {
			//       this.drinks = drinks
			//     }  	
			// });

			// this.storage.get('nightlife').then((nightlife) => {  	
			//     if(nightlife == undefined){
			//       this.nightlife = true
			//     } else {
			//       this.nightlife = nightlife
			//     }  	
			// });

			// this.storage.get('attractions').then((attractions) => {  	
			//     if(attractions == undefined){
			//       this.attractions = true
			//     } else {
			//       this.attractions = attractions
			//     }
			// });

			// this.storage.get('museums').then((museums) => {  	
			//     if(museums == undefined){
			//       this.museums = true
			//     } else {
			//       this.museums = museums
			//     }
			// });

			// this.storage.get('parks').then((parks) => {  	
			//     if(parks == undefined){
			//       this.parks = true
			//     } else {
			//       this.parks = parks
			//     }
			// });

			// if( this.food && this.drinks && this.nightlife && this.attractions && this.museums && this.parks){
			// 		this.all = true
			// } else {
			// 		this.all = false
			// }	  