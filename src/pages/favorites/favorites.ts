import { Component, OnInit, Inject } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ItemSliding,
  ToastController, LoadingController, AlertController
} from 'ionic-angular';

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
export class FavoritesPage implements OnInit {

  favoritos: Dish[];
  errMes: string;

  ngOnInit(): void {
    this.favoritoSrv.getFavoritos()
      .subscribe(pratos => this.favoritos = pratos,
        erro => this.errMes = erro);
  }

  deleteFavorito(item: ItemSliding, id: number) {
    console.log('delete ', id);
    let alert = this.alertCtrl.create({
      title: 'Apagar Prato',
      message: 'Desejar realmente apgar esse item ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelado')
          }
        },
        {
          text: 'Apagar',
          handler: () => {

            let loading = this.loadingCtrl.create({
              content: 'Deletando...'
            });
            let toast = this.toastCtrl.create({
              message: 'Prato id ' + id + " apagado com sucesso.",
              duration: 3000
            });
            loading.present();
            this.favoritoSrv.deleteFavorito(id)
              .subscribe(pratos => { this.favoritos = pratos; loading.dismiss(); toast.present() },
                erro => { this.errMes = erro; loading.dismiss() });
          }
        }
      ]
    });


    alert.present();
    item.close();

  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoritoSrv: FavoritoProvider, @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }



}
