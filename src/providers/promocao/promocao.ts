import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Promocao } from '../../shared/promocao';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';

import 'rxjs/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PromocaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromocaoProvider {

  constructor(public http: Http, public processHttp: ProcessHttpmsgProvider) {
    console.log('Hello Promocao Provider');
  }



  getPromoces(): Observable<Promocao[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => { return this.processHttp.extractData(res) })
      .catch(error => { return this.processHttp.handleError(error) })
  }

  getPromocao(id: number): Observable<Promocao> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => { return this.processHttp.extractData(res) })
      .catch(error => { return this.processHttp.handleError(error) })
  }

  getFeaturedPromocao(): Observable<Promocao> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => { return this.processHttp.extractData(res)[0] })
      .catch(error => { return this.processHttp.handleError(error) })
  }

}
