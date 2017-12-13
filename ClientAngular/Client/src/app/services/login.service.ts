import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class LoginService {

  public url;
  constructor(private _http: Http) {

    this.url=GLOBAL.url;
  }


  login(user ){
    let headers= new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'/authenticate',user,{headers:headers})
      .map(res=> res.json());

  }
}
