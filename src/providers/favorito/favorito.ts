
import { Injectable } from '@angular/core';

/*
  Generated class for the FavoritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritoProvider {

  favoritos:Array<any>;

  constructor() {
    console.log('Hello FavoritoProvider Provider');
    this.favoritos = [];
  }

  addFavorito(id : number): boolean {
    this.favoritos.push(id);
    return true;
  }

  isFavorito(id: number) : boolean {
    return this.favoritos.some(el => el === id);
  }

  

}
