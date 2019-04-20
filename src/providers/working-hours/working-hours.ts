import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WorkingHoursProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkingHoursProvider {
	today
	month
	weekDay
	hour
	minute

	constructor(public http: HttpClient) {}

	getTodayDate(){
	    this.today = new Date();
	    this.month = this.today.getMonth()
		this.weekDay = this.today.getDay()
		this.hour = this.today.getHours()
		this.minute = this.today.getMinutes()
	    console.log("month " + this.month+ " day of week " + this.weekDay + " hours " + this.hour)
	}

	isOpen(workingHours){
	    this.getTodayDate()
	  	let place = workingHours[this.month][this.weekDay]
	  	for (let i=1; i<place.length;){
		   	if((place[i-1]<=this.hour)&&(this.hour<place[i])){
		   		console.log(i-1)
		   		console.log(i)
		  		console.log(place[i--] + "<=" + this.hour + "<" + place[i])
		  		return "open"
		  	} 
		  	i+=2			
	  	} 
	  	return "closed"		
	}


}
