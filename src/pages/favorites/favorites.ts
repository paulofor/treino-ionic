import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';

import { FavoritoProvider } from '../../providers/favorito/favorito';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{

  favoritos: Dish[];
  errMes: string;

  ngOnInit(): void {
    this.favoritoSrv.getFavoritos()
      .subscribe(pratos => this.favoritos = pratos,
        erro => this.errMes = erro);
  }

  deleteFavorito(item:ItemSliding , id: number) {
    console.log('delete ' , id);
    this.favoritoSrv.deleteFavorito(id)
      .subscribe(pratos => this.favoritos = pratos,
        erro => this.errMes = erro);
    item.close(); 

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private favoritoSrv:FavoritoProvider, @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }


 
}
