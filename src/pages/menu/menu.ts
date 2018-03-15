import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoritoProvider } from '../../providers/favorito/favorito';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {   

  pratos: Dish[];
  mensagemErro: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dishSrv: DishProvider,@Inject('BaseURL') private BaseURL,
              private favoritoSrv: FavoritoProvider,
              private toastCtrl: ToastController) {
  }


  ngOnInit() {
    this.dishSrv.getPratos()
      .subscribe(pratos => this.pratos = pratos, 
        errmess => this.mensagemErro = errmess)
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  pratoSelecionado(event, prato) {
    this.navCtrl.push(DishdetailPage, {
      dish: prato, 
    })
  }
  adicionaFavorito(prato:Dish) {
    console.log('Adding to Favorites', prato.id);
    this.toastCtrl.create({
      message: 'Adicionado nos favoritos id ' + prato.id + ' com sucesso',
      duration: 3000
    }).present();
  }
}
