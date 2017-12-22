import { Component, OnInit } from '@angular/core';
import {EtapaService} from "../../services/etapa.service";

import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {Etapa} from '../../models/etapa';
import {dateFormatPipe} from '../../pipes/datePipe';



@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css'],
  providers:[EtapaService]
})
export class EtapaComponent implements OnInit {
  public actual:Etapa;
  public selected:Etapa;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;
  es:any; //variable para localizacion del calendar

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _empleadoService:EtapaService) {
    this.actual = new Etapa('');
    this.listado = [];
    this.getAll();
  }
  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  getAll() {
    this._empleadoService.getAll().subscribe(response => {
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
    this.actual = new Etapa('');
    this.displayDialog = true;


  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // dependiente save

      this._empleadoService.save(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.actual = new Etapa('');

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
      //dependiente update

      this._empleadoService.update(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Etapa('');

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
    this.actual = new Etapa( '');
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new Etapa( '');
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;



  }

  cloneObj(obj:Etapa):Etapa {
    let actual = new PrimeObj('');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }
}
class PrimeObj implements Etapa {

  constructor(public descripcion) {
  }
}
