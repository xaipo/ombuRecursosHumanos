import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {InduccionService} from '../../services/induccion.service';
import {CategoriaTrabajoService} from '../../services/categoria-trabajo.service';
import {Induccion} from '../../models/induccion';

@Component({
  selector: 'app-induccion',
  templateUrl: './induccion.component.html',
  styleUrls: ['./induccion.component.css'],
  providers: [
    CategoriaTrabajoService,
    InduccionService
  ]
})
export class InduccionComponent implements OnInit {

  public actual:Induccion;
  public selected:Induccion;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;


  public parametro:ParamObj;
  public selectedPara:ParamObj;
  public listadoPara :any =[];
  displayDialogPara:boolean;
  newObjPara:boolean;


  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _induccionService:InduccionService,
              private _categoriaTrabajoService:CategoriaTrabajoService) {

    this.actual = new Induccion(this.any, this.any, '',  []);
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this._induccionService.getAll().subscribe(response => {
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
    this.actual = new Induccion(this.any, this.any, '', []);
    this.displayDialog = true;
    this.listadoPara = [];
    this.categoria = null;

  }


  save() {
    let listado = [...this.listado];
    if(this.categoria && this.listadoPara.lenght!=0){
      if (this.newObj) {
        // funcion save
        this.actual.parametros = this.listadoPara;
        this.actual.categoriatrabajo = this.categoria._id;
        this._induccionService.save(this.actual).subscribe(
            response => {
            if (response) {
              this.status = "success";
              this.actual = new Induccion(this.any, this.any, '',  []);
              this.listadoPara = [];
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
        this.actual.parametros = this.listadoPara;
        this._induccionService.update(this.actual).subscribe(
            response => {
            if (response) {
              this.status = "success";
              this.getAll()
              //listado[this.findSelectedIndex()] = this.actual;
              this.actual = new Induccion(this.any, this.any, '',  []);
              this.listadoPara = [];
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

      this.actual = new Induccion(this.any, this.any, '',  []);
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
    this.actual =new Induccion(this.any, this.any, '',  []);
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoPara = this.actual.parametros;
    this.categoria = this.actual.categoriatrabajo;
  }

  cloneObj(obj:Induccion):Induccion {
    let actual = new PrimeObj('', '', '', []);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // FUNCIONES para el AUTOCOMPLEAT categoriaes ***************************************************************************

  //country: any;
  objs: any[];
  filteredObjSingle: any[];
  categoria :any;

  filterSingle(event) {
    let query = event.query;
    this._categoriaTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < objs.length; i++) {
      let categoria = objs[i];
      if(categoria.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(categoria);
      }
    }
    return filtered;
  }


  // Funciones para PARAMETRO *****************************************************************************
  showDialogToAddPara() {
    this.newObjPara = true;
    this.parametro = new ParamObj('');
    this.displayDialogPara = true;

  }

  savePara() {
    let listadoPara = [...this.listadoPara];
    if(this.newObjPara)
      listadoPara.push(this.parametro);
    else
      listadoPara[this.findSelectedIndexPara()] = this.parametro;

    this.listadoPara = listadoPara;
    this.parametro = new ParamObj('');
    this.displayDialogPara = false;
  }

  deletePara() {
    let index = this.findSelectedIndexPara();
    this.listadoPara = this.listadoPara.filter((val, i) => i != index);
    this.parametro = null;
    this.displayDialogPara = false;
  }
  onRowSelectPara(event) {
    this.newObjPara = false;
    this.parametro = this.cloneObjPara(event.data);
    this.displayDialogPara = true;
  }
  cloneObjPara(obj:any):any {
    let actual = new ParamObj('');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexPara():number {
    return this.listadoPara.indexOf(this.selectedPara);
  }

}

class PrimeObj implements Induccion {

  constructor(public _id, public categoriatrabajo, public descripcion, public parametros) {
  }
}

class ParamObj {

  constructor(public param) {
  }
}
