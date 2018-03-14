import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  reservaForm:  FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
            public viewCtrl:ViewController, private formBuilder:FormBuilder ) {
        this.reservaForm = this.formBuilder.group({
          guests: 3,
          smoking: false,
          dateTime: ['',Validators.required]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.reservaForm.value);
    this.viewCtrl.dismiss();
  }
}
