import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {CurriculoService} from '../../services/curriculo.service';
import {EmpleadoService} from '../../services/empleado.service';
import {Curriculo} from '../../models/curriculo';

import {PerfilTrabajoService} from '../../services/perfil-trabajo.service';
import {ModalidadTrabajoService} from '../../services/modalidad-trabajo.service';
import {CategoriaTrabajoService} from '../../services/categoria-trabajo.service';
import {DepartamentoService} from '../../services/departamento.service';
import {dateFormatPipe} from '../../pipes/datePipe';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css'],
  providers: [
    CurriculoService,
    EmpleadoService,
    PerfilTrabajoService,
    ModalidadTrabajoService,
    CategoriaTrabajoService,
    DepartamentoService
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
              private _empleadoService:EmpleadoService,
              private _perfilTrabajoService:PerfilTrabajoService,
              private _categoriaTrabajoService:CategoriaTrabajoService,
              private _modalidadTrabajoService:ModalidadTrabajoService,
              private _departamentoService:DepartamentoService) {
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
    this.actual.trabajo = this.listadoTrab;
    this.actual.personal_cargo = this.listadoPers;
    this.actual.experiencia_laboral = this.listadoExpe;
    this.actual.educacion = this.listadoEduc;
    if (this.newObj) {
      // funcion save

      this.actual.empleado = this.empleado._id;
      this._curriculoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new Curriculo(this.any, this.any, this.any, this.any, this.any, this.any);
            this.trabajo = new DescripObjTrab('', '', '', '', '', '','', '', '', '', '', '');;
            this.personal = new DescripObjPers('','');
            this.experiencia = new DescripObjExpe('','','','');
            this.educacion = new DescripObjEduc('','','','');
            this.listadoEduc = [];
            this.listadoExpe = [];
            this.listadoPers = [];
            this.listadoTrab = [];


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
    this.listadoEduc = this.actual.educacion;
    this.listadoExpe = this.actual.experiencia_laboral;
    this.listadoPers = this.actual.personal_cargo;
    this.listadoTrab = this.actual.trabajo;
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

  // FUNCIONES para el AUTOCOMPLETAR  EMPLEADO **********************************************************************************
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

  // FUNCIONES para el AUTOCOMPLETAR  PERSONA A CARGO ******************************************************************
  objsPers:any[];
  filteredObjSinglePers:any[];
  public persona:any;

  filterSinglePers(event) {
    let query = event.query;
    this._empleadoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSinglePers = this.filter(query, objs);
    });
  }

  filterPers(query, objs:any[]):any[] {
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

  // FUNCIONES para el AUTOCOMPLETAR  PERFIL **************************************************************************
  objsPerf:any[];
  filteredObjSinglePerf:any[];
  public perfil:any;

  filterSinglePerf(event) {
    let query = event.query;
    this._perfilTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSinglePerf = this.filterPerf(query, objs);
    });
  }

  filterPerf(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let perfil = objs[i];
      if (perfil.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(perfil);
      }
    }
    return filtered;
  }

  // FUNCIONES para el AUTOCOMPLETAR MODALIDAD ******************************************************************
  objsModa:any[];
  filteredObjSingleModa:any[];
  public modalidad:any;

  filterSingleModa(event) {
    let query = event.query;
    this._modalidadTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingleModa = this.filterModa(query, objs);
    });
  }

  filterModa(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let modalidad = objs[i];
      if (modalidad.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(modalidad);
      }
    }
    return filtered;
  }

  // FUNCIONES para el AUTOCOMPLETAR CATEGORIA TRABAJO ******************************************************************
  objsCate:any[];
  filteredObjSingleCate:any[];
  public categoria:any;

  filterSingleCate(event) {
    let query = event.query;
    this._categoriaTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingleCate = this.filterCate(query, objs);
    });
  }

  filterCate(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let categoria = objs[i];
      if (categoria.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(categoria);
      }
    }
    return filtered;
  }

  // FUNCIONES para el AUTOCOMPLETAR DEPARTAMENTO ******************************************************************
  objsDepa:any[];
  filteredObjSingleDepa:any[];
  public departamento:any;

  filterSingleDepa(event) {
    let query = event.query;
    this._departamentoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingleDepa = this.filterDepa(query, objs);
    });
  }

  filterDepa(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let departamento = objs[i];
      if (departamento.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(departamento);
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
    this.trabajo.perfil = this.perfil;
    this.trabajo.categoriatrabajo = this.categoria;
    this.trabajo.modalidad = this.modalidad;
    this.trabajo.departamento = this.departamento;

    let listadoTrab = [...this.listadoTrab];
    if (this.newObjTrab)
      listadoTrab.push(this.trabajo);
    else
      listadoTrab[this.findSelectedIndexTrab()] = this.trabajo;

    this.listadoTrab = listadoTrab;
    this.trabajo = new DescripObjTrab('', '', '', '', '', '','', '', '', '', '', '');
    this.perfil = null;
    this.categoria = null;
    this.modalidad = null;
    this.departamento = null;
    this.displayDialogTrab = false;


  }

  deleteTrab() {
    let index = this.findSelectedIndexTrab();
    this.listadoTrab = this.listadoTrab.filter((val, i) => i != index);
    this.trabajo = null;
    this.displayDialogTrab = false;

    this.perfil = null;
    this.categoria = null;
    this.modalidad = null;
    this.departamento = null;
  }

  onRowSelectTrab(event) {
    var datePipe = new dateFormatPipe();
    event.data['fecha_iniciocontrato']=datePipe.transform(event.data['fecha_iniciocontrato']);
    event.data['fecha_fincontrato']=datePipe.transform(event.data['fecha_fincontrato']);
    event.data['fecha_registro']=datePipe.transform(event.data['fecha_registro']);
    this.newObjTrab = false;
    this.trabajo = this.cloneObjTrab(event.data)
    this.perfil = this.trabajo.perfil;
    this.categoria = this.trabajo.categoriatrabajo;
    this.modalidad = this.trabajo.modalidad;
    this.departamento = this.trabajo.departamento;

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
    this.personal.empleado = this.persona;
    let listadoPers = [...this.listadoPers];
    if (this.newObjPers){
      listadoPers.push(this.personal);
    }
    else{
      listadoPers[this.findSelectedIndexPers()] = this.personal;
    }


    this.listadoPers = listadoPers;
    this.personal = new DescripObjPers('', '');
    this.displayDialogPers = false;
    this.persona = null;
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
    this.persona = this.personal.empleado;
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
    var datePipe = new dateFormatPipe();
    event.data['fecha_inicio']=datePipe.transform(event.data['fecha_inicio']);
    event.data['fecha_fin']=datePipe.transform(event.data['fecha_fin']);
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
    var datePipe = new dateFormatPipe();
    event.data['fecha_inicio']=datePipe.transform(event.data['fecha_inicio']);
    event.data['fecha_fin']=datePipe.transform(event.data['fecha_fin']);
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
