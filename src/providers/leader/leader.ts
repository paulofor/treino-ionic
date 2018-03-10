//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';

import 'rxjs/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http, public processHttp: ProcessHttpmsgProvider) {
    console.log('Hello Leader Provider');
  }



  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => { return this.processHttp.extractData(res) })
      .catch(error => { return this.processHttp.handleError(error) })
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => { return this.processHttp.extractData(res) })
      .catch(error => { return this.processHttp.handleError(error) })
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => { return this.processHttp.extractData(res)[0] })
      .catch(error => { return this.processHttp.handleError(error) })
  }

}
