import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AplicacionVacanteService} from '../../services/aplicacion-vacante.service';
import {AspiranteService} from '../../services/aspirante.service';
import {VacanteService} from '../../services/vacante.service';
import {dateFormatPipe} from '../../pipes/datePipe';
import {AplicacionVacante} from "../../models/aplicacion-vacante";

@Component({
  selector: 'app-aplicacion-vacante',
  templateUrl: './aplicacion-vacante.component.html',
  styleUrls: ['./aplicacion-vacante.component.css'],
  providers: [
    AspiranteService,
    VacanteService,
    AplicacionVacanteService
  ]
})
export class AplicacionVacanteComponent implements OnInit {
  public actual:AplicacionVacante;
  public selected:AplicacionVacante;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;
estados:any;

  public contacto:DescripObjCont;
  public selectedCont:DescripObjCont;
  public listadoCont:any = [];
  displayDialogCont:boolean;
  newObjCont:boolean;



  es:any; //variable para localizacion del calendar
  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _empleadoService:AplicacionVacanteService,
              private _vacante:VacanteService,
              private _aspirante:AspiranteService,
  ) {
    this.actual = new AplicacionVacante( '', '', '',new Date(), '', 0,  []);
    this.listado = [];
    this.getAll();

    this.estados = [
      {name: 'Rechazado', code: '0'},
      {name: 'Aceptado', code: '1'}

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
    this.actual = new AplicacionVacante( '', '', '',new Date(), '', 0,  []);
    this.displayDialog = true;

    this.listadoCont = [];

  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // dependiente save
      this.actual.id_aspirante=this.empleado2._id;
      this.actual.id_vacante=this.empleado._id;

      this.actual.publicacion = this.listadoCont;

      this._empleadoService.save(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.actual = new  AplicacionVacante( '', '', '',new Date(), '', 0,  []);
            this.listadoCont = [];

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
      this.actual.id_aspirante=this.empleado2._id;
      this.actual.id_vacante=this.empleado._id;
      this.actual.publicacion = this.listadoCont;

      this._empleadoService.update(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new AplicacionVacante( '', '', '',new Date(), '', 0,  []);
            this.listadoCont = [];

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
    this.actual = new AplicacionVacante( '', '', '',new Date(), '', 0,  []);
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new AplicacionVacante( '', '', '',new Date(), '', 0,  []);
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoCont = this.actual.publicacion;
    this.empleado=this.actual.id_vacante;
    this.empleado2=this.actual.id_aspirante;


  }

  cloneObj(obj:AplicacionVacante):AplicacionVacante {
    let actual = new PrimeObj('', '', '',new Date(), '', 0,  []);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }



  objs2:any[];
  filteredObjSingle2:any[];
  public empleado2:any;

  filterSingle2(event) {
    let query2 = event.query;
    this._aspirante.getAll().subscribe(objs2 => {
      //var auxObjs = objs;
      this.filteredObjSingle2 = this.filter2(query2, objs2);
    });
  }

  filter2(query2, objs2:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered2:any[] = [];
    for (let i = 0; i < objs2.length; i++) {
      let empleado2 = objs2[i];
      if (empleado2.primer_apellido.toLowerCase().indexOf(query2.toLowerCase()) == 0) {
        filtered2.push(empleado2);
      }
    }
    return filtered2;
  }


  //autocomplete
  objs:any[];
  filteredObjSingle:any[];
  public empleado:any;

  filterSingle(event) {
    let query = event.query;
    this._vacante.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let empleado = objs[i];
      if (empleado.descripcion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(empleado);
      }
    }
    return filtered;
  }
}

class PrimeObj implements AplicacionVacante {

  constructor(public id_vacante, public id_aspirante, public descripcion, public fecha_solicitud, public cv_adjunto, public estado,
              public publicacion) {
  }
}
class DescripObjCont {

  constructor(public id_etapa, public nota, public descripcion, public estado) {
  }
}
