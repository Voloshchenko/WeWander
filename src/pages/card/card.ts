import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
	card 
  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
              public viewCtrl : ViewController) {
    this.card =  navParams.get('card')
  }

  ionViewDidLoad() {}
  
  public closeModal(){
      this.viewCtrl.dismiss();
  }



}
