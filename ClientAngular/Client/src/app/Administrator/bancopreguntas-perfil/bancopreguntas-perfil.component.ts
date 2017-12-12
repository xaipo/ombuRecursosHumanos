import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {BancopreguntasPerfilService} from '../../services/bancopreguntas-perfil.service';
import {PerfilTrabajoService} from '../../services/perfil-trabajo.service';
import {BancopreguntasPerfil} from '../../models/bancopreguntas-perfil';

@Component({
  selector: 'app-bancopreguntas-perfil',
  templateUrl: './bancopreguntas-perfil.component.html',
  styleUrls: ['./bancopreguntas-perfil.component.css'],
  providers: [
    BancopreguntasPerfilService,
    PerfilTrabajoService
  ]
})
export class BancopreguntasPerfilComponent implements OnInit {

  public actual:BancopreguntasPerfil;
  public selected:BancopreguntasPerfil;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;


  public respuesta:DescripObj;
  public selectedResp:DescripObj;
  public listadoResp :any =[];
  displayDialogResp:boolean;
  newObjResp:boolean;

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _bancopreguntasPerfilService:BancopreguntasPerfilService,
              private _perfilTrabajoService:PerfilTrabajoService) {
    this.actual = new BancopreguntasPerfil(this.any, this.any, '',  []);
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {
  }
  getAll() {
    this._bancopreguntasPerfilService.getAll().subscribe(response => {
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
    this.actual = new BancopreguntasPerfil(this.any, this.any, '',  []);
    this.displayDialog = true;
    this.listadoResp = [];
    this.perfil = null;

  }


  save() {
    let listado = [...this.listado];
    if(this.perfil && this.actual.pregunta!="" && this.listadoResp.lenght!=0){
      if (this.newObj) {
        // funcion save
        this.actual.respuestas = this.listadoResp;
        this.actual.perfil = this.perfil._id;
        this._bancopreguntasPerfilService.save(this.actual).subscribe(
            response => {
            if (response) {
              this.status = "success";
              this.actual = new BancopreguntasPerfil(this.any, this.any, '',  []);
              this.listadoResp = [];
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
        this.actual.respuestas = this.listadoResp;
        this._bancopreguntasPerfilService.update(this.actual).subscribe(
            response => {
            if (response) {
              this.status = "success";
              this.getAll()
              //listado[this.findSelectedIndex()] = this.actual;
              this.actual = new BancopreguntasPerfil(this.any, this.any, '',  []);
              this.listadoResp = [];
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

      this.actual = new BancopreguntasPerfil(this.any, this.any, '',  []);
      this.displayDialog = false;
    }else{
      alert("ERROR, ingresar campos obligatorios");
    }

    //this.listado = listado;

  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }
  close() {
    this.actual =new BancopreguntasPerfil(this.any, this.any, '',  []);
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoResp = this.actual.respuestas;
    this.perfil = this.actual.perfil;
  }

  cloneObj(obj:BancopreguntasPerfil):BancopreguntasPerfil {
    let actual = new PrimeObj('', '', '', []);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // FUNCIONES para el AUTOCOMPLEAT perfiles ***************************************************************************

  //country: any;
  objs: any[];
  filteredObjSingle: any[];
  perfil :any;

  filterSingle(event) {
    let query = event.query;
    this._perfilTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < objs.length; i++) {
      let perfil = objs[i];
      if(perfil.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(perfil);
      }
    }
    return filtered;
  }



  // Funciones para PREGUNTAS - RESPUESTAS *****************************************************************************
  showDialogToAddResp() {
    this.newObjResp = true;
    this.respuesta = new DescripObj('', false);
    this.displayDialogResp = true;

  }

  saveResp() {
    let listadoResp = [...this.listadoResp];
    if(this.newObjResp)
      listadoResp.push(this.respuesta);
    else
      listadoResp[this.findSelectedIndexResp()] = this.respuesta;

    this.listadoResp = listadoResp;
    this.respuesta = new DescripObj('',false);
    this.displayDialogResp = false;
  }

  deleteResp() {
    let index = this.findSelectedIndexResp();
    this.listadoResp = this.listadoResp.filter((val, i) => i != index);
    this.respuesta = null;
    this.displayDialogResp = false;
  }
  onRowSelectResp(event) {
    this.newObjResp = false;
    this.respuesta = this.cloneObjResp(event.data);
    this.displayDialogResp = true;
  }
  cloneObjResp(obj:any):any {
    let actual = new DescripObj('',false);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexResp():number {
    return this.listadoResp.indexOf(this.selectedResp);
  }


}

class PrimeObj implements BancopreguntasPerfil {

  constructor(public _id, public perfil, public pregunta, public respuestas) {
  }
}

class DescripObj {

  constructor(public respuesta, public correcta:boolean) {
  }
}
