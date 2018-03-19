import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, 
  LoadingController, ActionSheetController, ModalController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { Comentario } from '../../shared/comentario';
import { FavoritoProvider } from '../../providers/favorito/favorito';
import { ComentarioPage } from '../../pages/comentario/comentario';
/** 
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  prato: Dish;
  mensagemErro: string;
  mediaEstrela: string;
  numeroComentario: number;
  favorito: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL, private favoritoSrv:FavoritoProvider,
    private toastCtrl: ToastController, private loadingCtrl:LoadingController,
    private actionSheetCtrl: ActionSheetController, private modalCtrl:ModalController) {
      
      this.prato = navParams.get('dish');

      this.numeroComentario = this.prato.comentario.length;
      let total = 0;
      this.prato.comentario.forEach(comment => total += comment.rating);    
      this.mediaEstrela = (total/this.numeroComentario).toFixed(2); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  adicionaFavorito() {
    console.log('Adding to Favorites', this.prato.id);
    this.favorito = this.favoritoSrv.addFavorito(this.prato.id);
    this.toastCtrl.create({
      message: 'Adicionado nos favoritos id ' + this.prato.id + ' com sucesso',
      position: 'middle',
      duration: 3000
    }).present();
  }

  onMore() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a ação',
      buttons: [
        {
          text: 'Adicionar Favorito',
          handler: () => {
            this.adicionaFavorito();
          }
        },{
          text: 'Adicionar Comentário',
          handler: () => {
            console.log('Archive clicked');
            this.abreComentario();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  abreComentario() {
    let modal = this.modalCtrl.create(ComentarioPage);
    modal.present();
  }
}
