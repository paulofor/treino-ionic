import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../shared/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage  } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm:  FormGroup;
  usuario: User = { username: '' , password : ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder, public viewCtrl:ViewController,
    private storage: Storage) {

      this.loginForm = this.formBuilder.group({
        username: ['',Validators.required],
        password: ['',Validators.required],
        lembrar: true
      });

      storage.get('user').then(user => {
        if (user) {
          this.usuario = user;
          this.loginForm
            .patchValue({
              'username': this.usuario.username,
              'password': this.usuario.password
            });
        } else {
          console.log('usuario não definido');
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.usuario.username = this.loginForm.get('username').value;
    this.usuario.password = this.loginForm.get('password').value;
    if (this.loginForm.get('lembrar').value) {
      this.storage.set('user',this.usuario);
    } else {
      this.storage.remove('user');
    }
    this.viewCtrl.dismiss();
  }

}
