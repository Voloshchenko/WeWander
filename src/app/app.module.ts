import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { HomePage } from '../pages/home/home';
import { CityPage } from '../pages/city/city';
import { TabsPage } from '../pages/tabs/tabs';
import { CardsPage } from '../pages/cards/cards';
import { MyMapPage } from '../pages/my-map/my-map';
import { FavePage } from '../pages/fave/fave';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { SwingModule } from 'angular2-swing';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { DistanceProvider } from '../providers/distance/distance';
import { CardsSettingsProvider } from '../providers/cards-settings/cards-settings';
import { WorkingHoursProvider } from '../providers/working-hours/working-hours';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CityPage,
    TabsPage,
    CardsPage,
    MyMapPage,
    FavePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SwingModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CityPage,
    TabsPage,
    CardsPage,
    MyMapPage,
    FavePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavoritesProvider,
    NativeStorage,
    GeolocationProvider,
    DistanceProvider,
    CardsSettingsProvider,
    WorkingHoursProvider
  ]
})
export class AppModule {}
