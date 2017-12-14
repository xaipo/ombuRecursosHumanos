import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {RolService} from '../../services/rol.service';
import {Rol} from '../../models/rol';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers: [
    RolService
  ]
})
export class RolComponent implements OnInit {

  public actual:Rol;
  public selected:Rol;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _rolService:RolService) {
    this.actual = new Rol(this.any, '','');
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this._rolService.getAll().subscribe(response => {
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
    this.actual = new Rol(this.any, '','');
    this.displayDialog = true;

  }


  save() {
    //let listado = [...this.listado];
    if (this.newObj) {
      // funcion save
      this._rolService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new Rol(this.any, '','');
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
      this._rolService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Rol(this.any, '','');
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
    this.actual = new Rol(this.any, '','');
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }
  close() {
    this.actual =new Rol(this.any, '','');
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
  }

  cloneObj(obj:Rol):Rol {
    let actual = new PrimeObj('', '','');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }
}

class PrimeObj implements Rol {

  constructor(public _id, public nombre, public descripcion) {
  }
}
