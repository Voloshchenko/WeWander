import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DistanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DistanceProvider {

  constructor(public http: HttpClient) {}

  calculateDistance(coord1, coord2){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((coord1[0]-coord2[0]) * p) / 2 + c(coord2[0] * p) *c((coord1[0]) * p) * (1 - c(((coord1[1]- coord2[1]) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

}
