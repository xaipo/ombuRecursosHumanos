import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class PerfilTrabajoService {

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getAll(){
    return this._http.get(this.url+'/perfilTrabajo')
      .map(res=>res.json());
  }
}
