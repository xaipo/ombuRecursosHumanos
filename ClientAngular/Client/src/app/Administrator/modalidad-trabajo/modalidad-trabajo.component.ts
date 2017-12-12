'use strict'
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {ModalidadTrabajoService} from '../../services/modalidad-trabajo.service';
import {ModalidadTrabajo} from '../../models/modalidad-trabajo';


@Component({
  selector: 'app-modalidad-trabajo',
  templateUrl: './modalidad-trabajo.component.html',
  styleUrls: ['./modalidad-trabajo.component.css'],
  providers: [
    ModalidadTrabajoService
  ]
})
export class ModalidadTrabajoComponent implements OnInit {

  public actual:ModalidadTrabajo;
  public selected:ModalidadTrabajo;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _modalidadTrabajoService:ModalidadTrabajoService) {
    this.actual = new ModalidadTrabajo(this.any, '');
    this.listado = [];
    this.getAll();

  }

  ngOnInit() {
  }

  getAll() {
    this._modalidadTrabajoService.getAll().subscribe(response => {
        this.listado = response;
        console.log(this.listado);
      },
        error=> {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  showDialogToAdd() {
    this.newObj = true;
    this.actual = new ModalidadTrabajo(this.any, '');
    this.displayDialog = true;

  }


  save() {
    //let listado = [...this.listado];
    if (this.newObj) {
      // funcion save
      this._modalidadTrabajoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new ModalidadTrabajo(this.any, '');
            this.getAll();
            //listado.push(this.actual);
          } else {
            this.status = "error";
          }
        },
          error => {
          console.log(<any>error);
        }
      );
    } else {
      //funcion update
      this._modalidadTrabajoService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new ModalidadTrabajo(this.any, '');
          } else {
            console.log("OBJ _id: error" + JSON.stringify(response));
            this.status = "error";
          }
        },
          error => {
          console.log(<any>error);
        }
      );

    }
    this.actual = new ModalidadTrabajo(this.any, '');
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }
  close() {
    this.actual =new ModalidadTrabajo(this.any, '');
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
  }

  cloneObj(obj:ModalidadTrabajo):ModalidadTrabajo {
    let actual = new PrimeObj('', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }
}

class PrimeObj implements ModalidadTrabajo {

  constructor(public _id, public nombre) {
  }
}
