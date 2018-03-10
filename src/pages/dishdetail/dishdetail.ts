import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { Comentario } from '../../shared/comentario';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL) {

      this.prato = navParams.get('dish');
      this.numeroComentario = this.prato.comentario.length;
      let total = 0;
      this.prato.comentario.forEach(comment => total += comment.rating);    
      this.mediaEstrela = (total/this.numeroComentario).toFixed(2); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

}
