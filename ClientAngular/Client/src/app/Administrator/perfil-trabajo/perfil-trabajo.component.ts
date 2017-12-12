import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {PerfilTrabajoService} from '../../services/perfil-trabajo.service';
import {PerfilTrabajo} from '../../models/perfil-trabajo';



@Component({
  selector: 'app-perfil-trabajo',
  templateUrl: './perfil-trabajo.component.html',
  styleUrls: ['./perfil-trabajo.component.css'],
  providers: [
    PerfilTrabajoService
  ]

})


export class PerfilTrabajoComponent implements OnInit {


  public actual:PerfilTrabajo;
  public selected:PerfilTrabajo;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;


  public destreza:DescripObj;
  public funcion:DescripObj;
  public selectedDest:DescripObj;
  public selectedFunc:DescripObj;
  public listadoDest :any =[];
  public listadoFunc :any =[];
  displayDialogDest:boolean;
  displayDialogFunc:boolean;
  newObjDest:boolean;
  newObjFunc:boolean;





  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _perfilTrabajoService:PerfilTrabajoService) {

    this.actual = new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {

  }

  getAll() {
    this._perfilTrabajoService.getAll().subscribe(response => {
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
    this.actual = new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
    this.displayDialog = true;

  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // funcion save
      this.actual.destrezas = this.listadoDest;
      this.actual.funciones = this.listadoFunc;
      this._perfilTrabajoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
            this.listadoDest = [];
            this.listadoFunc = [];
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
      this.actual.destrezas = this.listadoDest;
      this.actual.funciones = this.listadoFunc;
      this._perfilTrabajoService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
            this.listadoDest = [];
            this.listadoFunc = [];
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

    //this.listado = listado;
    this.actual = new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }
  close() {
    this.actual =new PerfilTrabajo(this.any, '', '', '', '', '', [], []);
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;

    this.listadoDest = this.actual.destrezas;
    this.listadoFunc = this.actual.funciones;
  }

  cloneObj(obj:PerfilTrabajo):PerfilTrabajo {
    let actual = new PrimeObj('', '', '', '', '', '', [], []);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // Funciones para DESTREZAS ******************************************************************************************
  showDialogToAddDest() {
    this.newObjDest = true;
    this.destreza = new DescripObj('');
    this.displayDialogDest = true;

  }

  saveDest() {
    let listadoDest = [...this.listadoDest];
    if(this.newObjDest)
      listadoDest.push(this.destreza);
    else
      listadoDest[this.findSelectedIndexDest()] = this.destreza;

    this.listadoDest = listadoDest;
    this.destreza = new DescripObj('');
    this.displayDialogDest = false;
  }

  deleteDest() {
    let index = this.findSelectedIndexDest();
    this.listadoDest = this.listadoDest.filter((val, i) => i != index);
    this.destreza = null;
    this.displayDialogDest = false;
  }
  onRowSelectDest(event) {
    this.newObjDest = false;
    this.destreza = this.cloneObjDes(event.data);
    this.displayDialogDest = true;
  }
  cloneObjDes(obj:any):any {
    let actual = new DescripObj('');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexDest():number {
    return this.listadoDest.indexOf(this.selectedDest);
  }

  // Funciones para FUNCIONES ******************************************************************************************
  showDialogToAddFunc() {
    this.newObjFunc = true;
    this.funcion = new DescripObj('');
    this.displayDialogFunc = true;

  }

  saveFunc() {
    let listadoFunc = [...this.listadoFunc];
    if(this.newObjFunc)
      listadoFunc.push(this.funcion);
    else
      listadoFunc[this.findSelectedIndexFunc()] = this.funcion;

    this.listadoFunc = listadoFunc;
    this.funcion = new DescripObj('');
    this.displayDialogFunc = false;
  }

  deleteFunc() {
    let index = this.findSelectedIndexFunc();
    this.listadoFunc = this.listadoFunc.filter((val, i) => i != index);
    this.funcion = null;
    this.displayDialogFunc = false;
  }
  onRowSelectFunc(event) {
    this.newObjFunc = false;
    this.funcion = this.cloneObjFunc(event.data);
    this.displayDialogFunc = true;
  }
  cloneObjFunc(obj:any):any {
    let actual = new DescripObj('');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexFunc():number {
    return this.listadoFunc.indexOf(this.selectedFunc);
  }


}

class PrimeObj implements PerfilTrabajo {

  constructor(public _id, public nombre, public descripcion, public escala_salarial,
              public limite_minimo, public limite_maximo, public destrezas, public funciones) {
  }
}

class DescripObj {

  constructor(public descripcion) {
  }
}
