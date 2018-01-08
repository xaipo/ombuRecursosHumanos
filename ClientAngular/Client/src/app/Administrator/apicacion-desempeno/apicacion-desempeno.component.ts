import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AplicacionDesempenoService} from '../../services/aplicacion-desempeno.service';
import {EvaluacionDesempenoService} from '../../services/evaluacion-desempeno.service';
import {EmpleadoService} from '../../services/empleado.service';
import {AplicacionDesempeno} from '../../models/aplicacion-desempeno';
import {dateFormatPipe} from '../../pipes/datePipe';

@Component({
  selector: 'app-apicacion-desempeno',
  templateUrl: './apicacion-desempeno.component.html',
  styleUrls: ['./apicacion-desempeno.component.css'],
  providers: [
    AplicacionDesempenoService,
    EvaluacionDesempenoService,
    EmpleadoService
  ]
})
export class ApicacionDesempenoComponent implements OnInit {

  public actual:AplicacionDesempeno;
  public selected:AplicacionDesempeno;
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
             private _aplicacionService:AplicacionDesempenoService,
             private _empleadoService:EmpleadoService,
             private _desempenoService:EvaluacionDesempenoService) {
    this.actual = new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
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
    this.actual = new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
    this.displayDialog = true;
    this.listadoPara = [];
    this.evaluacion = null;
    this.empleado = null;

  }


  save() {
    let listado = [...this.listado];
    if(this.evaluacion && this.empleado && this.listadoPara.lenght!=0){
      if (this.newObj) {
        // funcion save
        this.actual.parametros = this.listadoPara;
        this.actual.evaluacion = this.evaluacion._id;
        this.actual.empleado = this.empleado._id;
        this._aplicacionService.save(this.actual).subscribe(
                response => {
              if (response) {
                this.status = "success";
                this.actual = new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
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
        this.actual.evaluacion = this.evaluacion._id;
        this.actual.empleado = this.empleado._id;
        this._aplicacionService.update(this.actual).subscribe(
                response => {
              if (response) {
                this.status = "success";
                this.getAll()
                //listado[this.findSelectedIndex()] = this.actual;
                this.actual = new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
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

      this.actual = new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
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
    this.actual =new AplicacionDesempeno(this.any, this.any, this.any,this.any,[]);
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha']=datePipe.transform(event.data['fecha']);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoPara = this.actual.parametros;
    this.evaluacion = this.actual.evaluacion;
    this.empleado = this.actual.empleado;
  }

  cloneObj(obj:AplicacionDesempeno):AplicacionDesempeno {
    let actual = new PrimeObj('', '', '', '',[]);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }

  // FUNCIONES para el AUTOCOMPLEAT evaluacion desempeno ***************************************************************************

  //country: any;
  objs: any[];
  filteredObjSingle: any[];
  evaluacion :any;

  filterSingle(event) {
    let query = event.query;
    this._desempenoService.getAll().subscribe(objs => {
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
    for(let i = 0; i < this.evaluacion.parametros.length; i++) {
      let obj = this.evaluacion.parametros[i];
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

class PrimeObj implements AplicacionDesempeno {

  constructor(public _id, public evaluacion, public empleado, public fecha, public parametros) {
  }
}

class ParamObj {

  constructor(public param, public calificacion) {
  }
}