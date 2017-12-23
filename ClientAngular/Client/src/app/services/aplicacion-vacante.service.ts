import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class AplicacionVacanteService {

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getAll() {
    return this._http.get(this.url + '/aplicacionVacante')
      .map(res => res.json());
  }

  save(obj_to_register) {

    let params = JSON.stringify(obj_to_register);
    let headers = new Headers({'Content-Type': 'application/json'});


    return this._http.post(this.url + '/aplicacionVacante', params, {headers: headers})
      .map(res => res.json());
  }

  update(obj_to_update) {

    let params = JSON.stringify(obj_to_update);
    let headers = new Headers({'Content-Type': 'application/json'});


    return this._http.put(this.url + '/aplicacionVacante/' + obj_to_update._id, params, {headers: headers})
      .map(res => res.json());
  }
}
