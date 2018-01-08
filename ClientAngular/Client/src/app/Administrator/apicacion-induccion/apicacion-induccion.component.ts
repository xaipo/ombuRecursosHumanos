import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AplicacionInduccionService} from '../../services/aplicacion-induccion.service';
import {InduccionService} from '../../services/induccion.service';
import {EmpleadoService} from '../../services/empleado.service';
import {AplicacionInduccion} from '../../models/aplicacion-induccion';
import {dateFormatPipe} from '../../pipes/datePipe';

@Component({
  selector: 'app-apicacion-induccion',
  templateUrl: './apicacion-induccion.component.html',
  styleUrls: ['./apicacion-induccion.component.css'],
  providers: [
    AplicacionInduccionService,
    InduccionService,
    EmpleadoService
  ]
})
export class ApicacionInduccionComponent implements OnInit {

  public actual:AplicacionInduccion;
  public selected:AplicacionInduccion;
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

  es:any; //variable para localizacion del calendar

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _aplicacionService:AplicacionInduccionService,
              private _empleadoService:EmpleadoService,
              private _induccionService:InduccionService) {
    this.actual = new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
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
    this._aplicacionService.getAll().subscribe(response => {
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
    this.actual = new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
    this.displayDialog = true;
    this.listadoPara = [];
    this.induccion = null;
    this.empleado = null;

  }


  save() {
    let listado = [...this.listado];
    if(this.induccion && this.empleado && this.listadoPara.lenght!=0){
      if (this.newObj) {
        // funcion save
        this.actual.parametros = this.listadoPara;
        this.actual.induccion = this.induccion._id;
        this.actual.empleado = this.empleado._id;
        this._aplicacionService.save(this.actual).subscribe(
                response => {
              if (response) {
                this.status = "success";
                this.actual = new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
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
        this.actual.induccion = this.induccion._id;
        this.actual.empleado = this.empleado._id;
        this._aplicacionService.update(this.actual).subscribe(
                response => {
              if (response) {
                this.status = "success";
                this.getAll()
                //listado[this.findSelectedIndex()] = this.actual;
                this.actual = new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
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

      this.actual = new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
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
    this.actual =new AplicacionInduccion(this.any, this.any, this.any,this.any,[]);
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha']=datePipe.transform(event.data['fecha']);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoPara = this.actual.parametros;
    this.induccion = this.actual.induccion;
    this.empleado = this.actual.empleado;
  }

  cloneObj(obj:AplicacionInduccion):AplicacionInduccion {
    let actual = new PrimeObj('', '', '', '',[]);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // FUNCIONES para el AUTOCOMPLEAT induccion ***************************************************************************

  //country: any;
  objs: any[];
  filteredObjSingle: any[];
  induccion :any;

  filterSingle(event) {
    let query = event.query;
    this._induccionService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < objs.length; i++) {
      let induccion = objs[i];
      if(induccion.descripcion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(induccion);
      }
    }
    return filtered;
  }

// FUNCIONES para el AUTOCOMPLETAR  EMPLEADO **********************************************************************************
  objsEmpl:any[];
  filteredObjSingleEmpl:any[];
  public empleado:any;

  filterSingleEmpl(event) {
    let query = event.query;
    this._empleadoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingleEmpl = this.filterEmpl(query, objs);
    });
  }

  filterEmpl(query, objs:any[]):any[] {
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

  // FUNCIONES para el AUTOCOMPLETAR  PREGUNTAS **********************************************************************************
  objsParam:any[];
  filteredParam:any[];
  public param:any;

  filterSingleParam(event) {
    this.filteredParam = [];
    for(let i = 0; i < this.induccion.parametros.length; i++) {
      let obj = this.induccion.parametros[i];
      if(obj.param.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredParam.push(obj.param);
      }
    }
  }



  // Funciones para PARAMETRO *****************************************************************************
  showDialogToAddPara() {
    this.newObjPara = true;
    this.parametro = new ParamObj('','');
    this.displayDialogPara = true;

  }

  savePara() {
    let listadoPara = [...this.listadoPara];
    this.parametro.param = this.param;
    if(this.newObjPara)
      listadoPara.push(this.parametro);
    else
      listadoPara[this.findSelectedIndexPara()] = this.parametro;

    this.listadoPara = listadoPara;
    this.parametro = new ParamObj('','');
    this.param = null;
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
    this.param = this.parametro.param;
    this.displayDialogPara = true;
  }
  cloneObjPara(obj:any):any {
    let actual = new ParamObj('','');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndexPara():number {
    return this.listadoPara.indexOf(this.selectedPara);
  }

}

class PrimeObj implements AplicacionInduccion {

  constructor(public _id, public induccion, public empleado, public fecha, public parametros) {
  }
}

class ParamObj {

  constructor(public param, public calificacion) {
  }
}
