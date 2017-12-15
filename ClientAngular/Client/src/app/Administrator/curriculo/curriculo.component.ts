import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {CurriculoService} from '../../services/curriculo.service';
import {EmpleadoService} from '../../services/empleado.service';
import {Curriculo} from '../../models/curriculo';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css'],
  providers: [
    CurriculoService,
    EmpleadoService
  ]
})
export class CurriculoComponent implements OnInit {

  public actual:Curriculo;
  public selected:Curriculo;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;

  public trabajo:DescripObjTrab;
  public selectedTrab:DescripObjTrab;
  public listadoTrab:any = [];
  displayDialogTrab:boolean;
  newObjTrab:boolean;

  public personal:DescripObjPers;
  public selectedPers:DescripObjPers;
  public listadoPers:any = [];
  displayDialogPers:boolean;
  newObjPers:boolean;

  public experiencia:DescripObjExpe;
  public selectedExpe:DescripObjExpe;
  public listadoExpe:any = [];
  displayDialogExpe:boolean;
  newObjExpe:boolean;

  public educacion:DescripObjEduc;
  public selectedEduc:DescripObjEduc;
  public listadoEduc:any = [];
  displayDialogEduc:boolean;
  newObjEduc:boolean;

  es:any; //variable para localizacion del calendar


  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _curriculoService:CurriculoService,
              private _empleadoService:EmpleadoService) {
    this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
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
    this._curriculoService.getAll().subscribe(response => {
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
    this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
    this.displayDialog = true;
    this.empleado = null;

  }


  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      // funcion save

      this.actual.empleado = this.empleado._id;
      this._curriculoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
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
      this.actual.empleado = this.empleado._id;
      this._curriculoService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll()
            //listado[this.findSelectedIndex()] = this.actual;
            this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
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

    this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
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
    this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.empleado = this.actual.empleado;
  }

  cloneObj(obj:Curriculo):Curriculo {
    let actual = new PrimeObj('', '', '', '', '', '');
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

// Funciones para TRABAJOS ******************************************************************************************
  showDialogToAddTrab() {
    this.newObjTrab = true;
    this.trabajo = new DescripObjTrab('', '', '', '', '', '','', '', '', '', '', '');
    this.displayDialogTrab = true;

  }

  saveTrab() {
    let listadoTrab = [...this.listadoTrab];
    if (this.newObjTrab)
      listadoTrab.push(this.trabajo);
    else
      listadoTrab[this.findSelectedIndexTrab()] = this.trabajo;

    this.listadoTrab = listadoTrab;
    this.trabajo = new DescripObjTrab('', '', '', '', '', '','', '', '', '', '', '');
    this.displayDialogTrab = false;
  }

  deleteTrab() {
    let index = this.findSelectedIndexTrab();
    this.listadoTrab = this.listadoTrab.filter((val, i) => i != index);
    this.trabajo = null;
    this.displayDialogTrab = false;
  }

  onRowSelectTrab(event) {
    this.newObjTrab = false;
    this.trabajo = this.cloneObjTrab(event.data);
    this.displayDialogTrab = true;
  }

  cloneObjTrab(obj:any):any {
    let actual = new DescripObjTrab('', '', '', '', '', '','', '', '', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexTrab():number {
    return this.listadoTrab.indexOf(this.selectedTrab);
  }

// Funciones para personal ******************************************************************************************
  showDialogToAddPers() {
    this.newObjPers = true;
    this.personal = new DescripObjPers('', '');
    this.displayDialogPers = true;

  }

  savePers() {
    let listadoPers = [...this.listadoPers];
    if (this.newObjPers)
      listadoPers.push(this.personal);
    else
      listadoPers[this.findSelectedIndexPers()] = this.personal;

    this.listadoPers = listadoPers;
    this.personal = new DescripObjPers('', '');
    this.displayDialogPers = false;
  }

  deletePers() {
    let index = this.findSelectedIndexPers();
    this.listadoPers = this.listadoPers.filter((val, i) => i != index);
    this.personal = null;
    this.displayDialogPers = false;
  }

  onRowSelectPers(event) {
    this.newObjPers = false;
    this.personal = this.cloneObjPers(event.data);
    this.displayDialogPers = true;
  }

  cloneObjPers(obj:any):any {
    let actual = new DescripObjPers('', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexPers():number {
    return this.listadoPers.indexOf(this.selectedPers);
  }

// Funciones para experiencia ******************************************************************************************
  showDialogToAddExpe() {
    this.newObjExpe = true;
    this.experiencia = new DescripObjExpe('', '', '', '');
    this.displayDialogExpe = true;

  }

  saveExpe() {
    let listadoExpe = [...this.listadoExpe];
    if (this.newObjExpe)
      listadoExpe.push(this.experiencia);
    else
      listadoExpe[this.findSelectedIndexExpe()] = this.experiencia;

    this.listadoExpe = listadoExpe;
    this.experiencia = new DescripObjExpe('', '', '', '');
    this.displayDialogExpe = false;
  }

  deleteExpe() {
    let index = this.findSelectedIndexExpe();
    this.listadoExpe = this.listadoExpe.filter((val, i) => i != index);
    this.experiencia = null;
    this.displayDialogExpe = false;
  }

  onRowSelectExpe(event) {
    this.newObjExpe = false;
    this.experiencia = this.cloneObjExpe(event.data);
    this.displayDialogExpe = true;
  }

  cloneObjExpe(obj:any):any {
    let actual = new DescripObjExpe('', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexExpe():number {
    return this.listadoExpe.indexOf(this.selectedExpe);
  }

// Funciones para educacion ******************************************************************************************
  showDialogToAddEduc() {
    this.newObjEduc = true;
    this.educacion = new DescripObjEduc('', '', '', '');
    this.displayDialogEduc = true;

  }

  saveEduc() {
    let listadoEduc = [...this.listadoEduc];
    if (this.newObjEduc)
      listadoEduc.push(this.educacion);
    else
      listadoEduc[this.findSelectedIndexEduc()] = this.educacion;

    this.listadoEduc = listadoEduc;
    this.educacion = new DescripObjEduc('', '', '', '');
    this.displayDialogEduc = false;
  }

  deleteEduc() {
    let index = this.findSelectedIndexEduc();
    this.listadoEduc = this.listadoEduc.filter((val, i) => i != index);
    this.educacion = null;
    this.displayDialogEduc = false;
  }

  onRowSelectEduc(event) {
    this.newObjEduc = false;
    this.educacion = this.cloneObjEduc(event.data);
    this.displayDialogEduc = true;
  }

  cloneObjEduc(obj:any):any {
    let actual = new DescripObjEduc('', '', '', '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexEduc():number {
    return this.listadoEduc.indexOf(this.selectedEduc);
  }

}

class PrimeObj implements Curriculo {

  constructor(public _id, public empleado, public trabajo, public personal_cargo, public experiencia_laboral, public educacion) {
  }
}

class DescripObjTrab {
  //estado string 0-activo 1-inactivo
  constructor(public perfil, public modalidad, public categoriatrabajo, public departamento, public fecha_registro,
              public fecha_iniciocontrato, public fecha_fincontrato, public contrato_firmado,
              public frecuencia_pago, public salario, public observaciones, public estado) {
  }
}

class DescripObjPers {

  constructor(public empleado, public tipo_subordinacion) {
  }
}

class DescripObjExpe {

  constructor(public empresa, public cargo, public fecha_inicio, public fecha_fin) {
  }
}

class DescripObjEduc {

  constructor(public nivel_estudio, public instituto, public fecha_inicio, public fecha_fin) {
  }
}
