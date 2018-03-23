
import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
/*
  Generated class for the FavoritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritoProvider {

  favoritos:Array<any>;

  constructor(public http:Http, private dishSrv:DishProvider, 
        private storage: Storage, private localNotifications: LocalNotifications) {
    console.log('Hello FavoritoProvider Provider');
    this.favoritos = [];
    this.storage.set("favoritos",this.favoritos);
  }

  addFavorito(id : number): boolean {
    if (!this.isFavorito(id))
      this.favoritos.push(id);
    this.storage.set("favoritos",this.favoritos);
    this.localNotifications.schedule({
      id: id,
      text: 'Prato ' + id + 'adicionado a favoritos'
    })
    return true;
  }

  isFavorito(id: number) : boolean {
    this.storage.get('favoritos').then((val) => {
      this.favoritos =  val;
    });
    return this.favoritos.some(el => el === id);
  }

  getFavoritos() : Observable<Dish[]> {
    this.storage.get('favoritos').then((val) => {
      this.favoritos =  val;
    });
    return this.dishSrv.getPratos()
      .map(pratos => pratos.filter(prato => this.favoritos.some(el => el === prato.id)));
  }
  deleteFavorito(id: number) : Observable<Dish[]>{
    let index = this.favoritos.indexOf(id);
    if (index >= 0) {
      this.favoritos.splice(index,1);
      this.storage.set("favoritos",this.favoritos);
      return this.getFavoritos();
    } else {
      console.log('Deletando item inexistente', id);
      return Observable.throw('Deletando item inexistente' + id);
    }
  }

}
