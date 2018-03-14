
import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { DishProvider } from '../dish/dish';
/*
  Generated class for the FavoritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritoProvider {

  favoritos:Array<any>;

  constructor(public http:Http, private dishSrv:DishProvider) {
    console.log('Hello FavoritoProvider Provider');
    this.favoritos = [];
  }

  addFavorito(id : number): boolean {
    if (!this.isFavorito(id))
      this.favoritos.push(id);
    return true;
  }

  isFavorito(id: number) : boolean {
    return this.favoritos.some(el => el === id);
  }

  getFavoritos() : Observable<Dish[]> {
    return this.dishSrv.getPratos()
      .map(pratos => pratos.filter(prato => this.favoritos.some(el => el === prato.id)));
  }
  deleteFavorito(id: number) : Observable<Dish[]>{
    let index = this.favoritos.indexOf(id);
    if (index >= 0) {
      this.favoritos.splice(index,1);
      return this.getFavoritos();
    } else {
      console.log('Deletando item inexistente', id);
      return Observable.throw('Deletando item inexistente' + id);
    }
  }

}
