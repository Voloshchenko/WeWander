import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';


@Injectable()
export class GeolocationProvider {

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  position = []
 
  constructor(public zone: NgZone,
              private geolocation: Geolocation,
              private backgroundGeolocation: BackgroundGeolocation) {
 
  }

  startTracking() {
   
    // Background Tracking 
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => { 
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      }); 
    }, (err) => { 
      console.log(err); 
    });
   
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
   
   
    // Foreground Tracking
   
  	let options = {
  	  frequency: 3000,
  	  enableHighAccuracy: true
  	};
  	 
  	this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {	 
  	  // Run update inside of Angular's zone
  	  this.zone.run(() => {
  	    this.lat = position.coords.latitude;
  	    this.lng = position.coords.longitude;
        this.position = [position.coords.latitude, position.coords.longitude]
  	  });	 
  	}); 
  }
 
  stopTracking() { 
	  this.backgroundGeolocation.finish();
	  this.watch.unsubscribe(); 
	  this.backgroundGeolocation.stop();
  }
}
