  
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReservaPage } from '../pages/reserva/reserva';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loading: any = null;

  pages: Array<{title: string, icon:string , component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public modalCtrl:ModalController, private netowrk:Network, 
              private loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon:'home', component: HomePage },
      { title: 'Sobre', icon:'information-circle', component: AboutPage },
      { title: 'Menu', icon:'list-box', component: MenuPage },
      { title: 'Contato', icon:'contact', component: ContactPage },
      { title: 'Favoritos', icon:'heart', component: FavoritesPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.netowrk.onDisconnect()
        .subscribe( () => {
          if (!this.loading) {
            this.loading = this.loadingCtrl.create({
              content: 'Sem conexão'
            });
            this.loading.present();
          }
        }
        );
     
      this.netowrk.onConnect()
        .subscribe( () => {
          setTimeout(() => {
            if (this.netowrk.type == 'wifi')
              console.log('Rede WiFi');
          }, 3000);
          if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
          }
        });
    
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  abreReserva() {
    let modal = this.modalCtrl.create(ReservaPage);
    modal.present();
  }

  abreLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
