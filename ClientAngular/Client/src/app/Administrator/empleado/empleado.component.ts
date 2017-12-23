import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {EmpleadoService} from '../../services/empleado.service';
import {Empleado} from '../../models/empleado';
import {dateFormatPipe} from '../../pipes/datePipe';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [
    EmpleadoService
  ]
})
export class EmpleadoComponent implements OnInit {

  public actual:Empleado;
  public selected:Empleado;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;


  public contacto:DescripObjCont;
  public selectedCont:DescripObjCont;
  public listadoCont:any = [];
  displayDialogCont:boolean;
  newObjCont:boolean;

  public dependiente:DescripObjDepe;
  public selectedDepe:DescripObjDepe;
  public listadoDepe:any = [];
  displayDialogDepe:boolean;
  newObjDepe:boolean;

  es:any; //variable para localizacion del calendar

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _empleadoService:EmpleadoService) {
    this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
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
    this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
    this.displayDialog = true;

    this.listadoCont = [];
    this.listadoDepe = [];
  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // dependiente save
      this.actual.contacto_emergencia = this.listadoCont;
      this.actual.dependientes = this.listadoDepe;
      this._empleadoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
            this.listadoCont = [];
            this.listadoDepe = [];
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
      this.actual.contacto_emergencia = this.listadoCont;
      this.actual.dependientes = this.listadoDepe;
      this._empleadoService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
            this.listadoCont = [];
            this.listadoDepe = [];
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
    this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new Empleado(this.any, '', '', '', '', '', '', this.any, '', '', '', '', '', '', '', '', [], []);
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoCont = this.actual.contacto_emergencia;
    this.listadoDepe = this.actual.dependientes;
    console.log(this.actual)

  }

  cloneObj(obj:Empleado):Empleado {
    let actual = new PrimeObj('', '', '', '', '', '', '', new Date(), '', '', '', '', '', '', '', '', [], []);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }



  // Funciones para CONTACTOS ******************************************************************************************
  showDialogToAddCont() {
    this.newObjCont = true;
    this.contacto = new DescripObjCont('', '', '', '', '', '');
    this.displayDialogCont = true;

  }

  saveCont() {
    let listadoCont = [...this.listadoCont];
    if (this.newObjCont)
      listadoCont.push(this.contacto);
    else
      listadoCont[this.findSelectedIndexCont()] = this.contacto;

    this.listadoCont = listadoCont;
    this.contacto = new DescripObjCont('', '', '', '', '', '');
    this.displayDialogCont = false;
  }

  deleteCont() {
    let index = this.findSelectedIndexCont();
    this.listadoCont = this.listadoCont.filter((val, i) => i != index);
    this.contacto = null;
    this.displayDialogCont = false;
  }

  onRowSelectCont(event) {
    this.newObjCont = false;
    this.contacto = this.cloneObjCont(event.data);
    this.displayDialogCont = true;
  }

  cloneObjCont(obj:any):any {
    let actual = new DescripObjCont('', '', '', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexCont():number {
    return this.listadoCont.indexOf(this.selectedCont);
  }

  // Funciones para DEPENDIENTES****************************************************************************************
  showDialogToAddDepe() {
    this.newObjDepe = true;
    this.dependiente = new DescripObjDepe('', '', '', '');
    this.displayDialogDepe = true;

  }

  saveDepe() {
    let listadoDepe = [...this.listadoDepe];
    if (this.newObjDepe)
      listadoDepe.push(this.dependiente);
    else
      listadoDepe[this.findSelectedIndexDepe()] = this.dependiente;

    this.listadoDepe = listadoDepe;
    this.dependiente = new DescripObjDepe('', '', '', '');
    this.displayDialogDepe = false;
  }

  deleteDepe() {
    let index = this.findSelectedIndexDepe();
    this.listadoDepe = this.listadoDepe.filter((val, i) => i != index);
    this.dependiente = null;
    this.displayDialogDepe = false;
  }

  onRowSelectDepe(event) {
    this.newObjDepe = false;
    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    this.dependiente = this.cloneObjDepe(event.data);
    this.displayDialogDepe = true;
  }

  cloneObjDepe(obj:any):any {
    let actual = new DescripObjDepe('', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexDepe():number {
    return this.listadoDepe.indexOf(this.selectedDepe);
  }


}

class PrimeObj implements Empleado {

  constructor(public _id, public nombre, public apellido, public cedula, public genero, public estado_civil,
              public nacionalidad, public fecha_nacimiento, public lugar_nacimiento, public fotografia,
              public direccion, public ciudad, public provincia, public telefono_domicilio,
              public telefono_celular, public email, public contacto_emergencia, public dependientes) {
  }
}

class DescripObjCont {

  constructor(public nombre, public relacion, public telefono_domicilio, public telefono_celular,
              public telefono_trabajo, public email) {
  }
}

class DescripObjDepe {

  constructor(public nombre, public identificacion, public relacion, public fecha_nacimiento) {
  }
}
