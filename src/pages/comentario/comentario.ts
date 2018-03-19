import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comentario } from '../../shared/comentario';

/**
 * Generated class for the ComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentario',
  templateUrl: 'comentario.html',
})
export class ComentarioPage {

  comentarioForm:  FormGroup;
  comentario: Comentario;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
                private formBuilder:FormBuilder, public viewCtrl:ViewController) {
    this.comentarioForm = this.formBuilder.group({
      author: '',
      rating: 5,
      comment: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentarioPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {

    this.comentario.date = new Date().toISOString();
    this.comentario = this.comentarioForm.value;
    console.log(this.comentario);

    //this.pratoWrk.comentario.push(this.comment);

    this.viewCtrl.dismiss();
  }

}
