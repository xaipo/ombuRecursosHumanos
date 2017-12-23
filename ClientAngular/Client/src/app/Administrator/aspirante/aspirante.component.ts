import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AspiranteService} from '../../services/aspirante.service';
import {Aspirante} from '../../models/aspirante';
import {dateFormatPipe} from '../../pipes/datePipe';
@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css'],
  providers:[ AspiranteService]
})
export class AspiranteComponent implements OnInit {
  public actual:Aspirante;
  public selected:Aspirante;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;
  es:any; //variable para localizacion del calendar
  estados;
  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _empleadoService:AspiranteService) {
    this.actual = new Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');
    this.listado = [];
    this.getAll();
    this.estados = [
      {name: 'Aspirante', code: '0'},
      {name: 'Elegible', code: '1'},
      {name: 'Contratado', code: '2'},
      {name: 'Fin Funciones', code: '3'}

    ];
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
    this.actual = new  Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');
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
            this.actual = new Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');

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
    //  this.actual.fecha_nacimiento=new Date(this.actual.fecha_nacimiento);
      this._empleadoService.update(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');

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
    this.actual = new Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new Aspirante('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    console.log(event.data);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;



  }

  cloneObj(obj:Aspirante):Aspirante {
    let actual = new PrimeObj('', '', '', '', '', '', '', this.any, new Date(), '', '', '', '', '', '', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

}
class PrimeObj implements Aspirante {

  constructor( public primer_nombre, public segundo_nombre, public primer_apellido, public segundo_apellido, public cedula,
              public genero, public estado_civil, public nacionalidad, public fecha_nacimiento,
              public lugar_nacimiento, public fotografia, public estado, public direccion,
              public ciudad, public provincia, public telefono_domicilio, public telefono_celular, public correo_electronico) {
  }
}
