import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {EmpresaService} from '../../services/empresa.service';
import {EmpleadoService} from '../../services/empleado.service';
import {Empresa} from '../../models/empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [
    EmpresaService,
    EmpleadoService
  ]
})
export class EmpresaComponent implements OnInit {

  public actual:Empresa;
  public selected:Empresa;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _empresaService:EmpresaService,
              private _empleadoService:EmpleadoService) {
    this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this._empresaService.getAll().subscribe(response => {
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
    this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
    this.displayDialog = true;
    this.empleado = null;

  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // funcion save

      this.actual.gerente = this.empleado._id;
      this._empresaService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
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

      this._empresaService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
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

    this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
    this.displayDialog = false;


    //this.listado = listado;

  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new Empresa(this.any,'','', '',this.any,'','','','');
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.empleado = this.actual.gerente;
  }

  cloneObj(obj:Empresa):Empresa {
    let actual = new PrimeObj('', '', '','', '', '','', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // FUNCIONES para el AUTOCOMPLETAR  **********************************************************************************

  //country: any;
  objs:any[];
  filteredObjSingle:any[];
  public empleado:any;

  filterSingle(event) {
    let query = event.query;
    this._empleadoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let empleado = objs[i];
      if (empleado.apellido.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(empleado);
      }
    }
    return filtered;
  }

}

class PrimeObj implements Empresa {

  constructor(public _id, public nombre, public objeto_negocio, public direccion, public gerente, public ciudad,
              public provincia, public telefono, public email) {
  }
}

