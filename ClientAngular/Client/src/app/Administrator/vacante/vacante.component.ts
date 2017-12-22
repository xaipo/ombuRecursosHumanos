import { Component, OnInit } from '@angular/core';
import {Vacante} from '../../models/vacante';
import {VacanteService} from "../../services/vacante.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Publicacion} from "../../models/publicacion";
import {PerfilTrabajoService} from "../../services/perfil-trabajo.service";
import {EmpleadoService} from "../../services/empleado.service";
import {dateFormatPipe} from "../../pipes/datePipe";
@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.component.html',
  styleUrls: ['./vacante.component.css'],
  providers: [
    VacanteService,
    PerfilTrabajoService,
    EmpleadoService
  ]
})
export class VacanteComponent implements OnInit {

  public actual:Vacante;
  public selected:Vacante;
  public listado:any;
  public status:string;
  newObj:boolean;
  any:any;
  displayDialog:boolean;
  public publicacion:Publicacion;
  public listadoPublicacion:any;
  displayDialogPublicacion:boolean;
  newObjPublicacion:boolean;
  estados: any;
  newObjCont:any;
  contacto :any;
  displayDialogCont:any;
  selectedCont;
  es:any; //variable para localizacion del calendar
  tipos:any;
  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _vacanteService:VacanteService,
              private _perfilTrabajoService:PerfilTrabajoService,
              private _empleadoService:EmpleadoService) {

    this.actual = new Vacante('','','','',0,new Date(),0,[]);
    this.listado = [];
    this.getAll();

    this.estados = [
      {name: 'Cerrado', code: '0'},
      {name: 'Vigente', code: '1'}

    ];

    this.tipos = [
      {name: 'Periodico', code: 'periodico'},
      {name: 'TV', code: 'tv'},
      {name: 'Radio', code: 'radio'},
      {name: 'Redes Sociales', code: 'social'},

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
    this._vacanteService.getAll().subscribe(response => {
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
    this.actual = new Vacante('','','','',0,new Date(),0,[]);
    this.displayDialog = true;
    this.listadoPublicacion = [];

  }

  //autocomplete
  objs:any[];
  filteredObjSingle:any[];
  public empleado:any;

  filterSingle(event) {
    let query = event.query;
    this._perfilTrabajoService.getAll().subscribe(objs => {
      //var auxObjs = objs;
      this.filteredObjSingle = this.filter(query, objs);
    });
  }

  filter(query, objs:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered:any[] = [];
    for (let i = 0; i < objs.length; i++) {
      let empleado = objs[i];
      if (empleado.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(empleado);
      }
    }
    return filtered;
  }

  objs2:any[];
  filteredObjSingle2:any[];
  public empleado2:any;

  filterSingle2(event) {
    let query2 = event.query;
    this._empleadoService.getAll().subscribe(objs2 => {
      //var auxObjs = objs;
      this.filteredObjSingle2 = this.filter2(query2, objs2);
    });
  }

  filter2(query2, objs2:any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered2:any[] = [];
    for (let i = 0; i < objs2.length; i++) {
      let empleado2 = objs2[i];
      if (empleado2.apellido.toLowerCase().indexOf(query2.toLowerCase()) == 0) {
        filtered2.push(empleado2);
      }
    }
    return filtered2;
  }




  save() {
    let listado = [...this.listado];
    if (this.newObj) {
      console.log(this.actual);
      // dependiente save
      this.actual.publicacion = this.listadoPublicacion;
      this.actual.responsable = this.empleado2._id;
      this.actual.id_perfil = this.empleado._id;
      this.actual.estado_vacante = this.actual.estado_vacante.code;
      this._vacanteService.save(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";
            this.empleado='';
            this.empleado2='';
            this.actual = new Vacante('','','','',0,new Date(),0,[]);
            this.listadoPublicacion = [];

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
      this.actual.publicacion = this.listadoPublicacion;
      this.actual.responsable = this.empleado2._id;
      this.actual.id_perfil = this.empleado._id;
      this.actual.estado_vacante = this.actual.estado_vacante.code;
      this._vacanteService.update(this.actual).subscribe(
        response => {
          if (response) {
            this.status = "success";

            //listado[this.findSelectedIndex()] = this.actual;
            this.empleado='';
            this.empleado2='';
            this.actual = new Vacante('','','','',0,new Date(),0,[]);
            this.listadoPublicacion = [];
            this.getAll()


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
    this.actual = new Vacante('','','','',0,new Date(),0,[]);
    this.listadoPublicacion = [];
    this.displayDialog = false;
  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }

  close() {
    this.actual = new Vacante('','','','',0,new Date(),0,[]);
    this.listadoPublicacion = [];
    this.empleado='';
    this.empleado2='';
    this.displayDialog = false;
  }

  onRowSelect(event) {

    var datePipe = new dateFormatPipe();
    event.data['fecha_nacimiento']=datePipe.transform(event.data['fecha_nacimiento']);
    console.log(this.contacto);
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.displayDialog = true;
    this.listadoPublicacion = this.actual.publicacion;
    this.empleado=this.actual.id_perfil;
    this.empleado2=this.actual.responsable;
   ;


  }

  cloneObj(obj:Vacante):Vacante{

    let actual = new PrimeObj(this.any,'','','',this.any,0,new Date(),0,[]);
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }




  showDialogToAddCont() {
    this.newObjCont = true;
    this.contacto = new Publicacion('','',new Date(), '');
    this.displayDialogCont = true;

  }

  saveCont() {
    let listadoCont = [...this.listadoPublicacion];
    if (this.newObjCont)
      listadoCont.push(this.contacto);
    else
      listadoCont[this.findSelectedIndexCont()] = this.contacto;

    this.listadoPublicacion = listadoCont;
    this.contacto = new DescripObjCont('', '', new Date(), '');
    this.displayDialogCont = false;
  }


  findSelectedIndexCont():number {
    return this.listadoPublicacion.indexOf(this.selectedCont);
  }

  deleteCont() {
    let index = this.findSelectedIndexCont();
    this.listadoPublicacion = this.listadoPublicacion.filter((val, i) => i != index);
    this.contacto = null;
    this.displayDialogCont = false;
  }

  onRowSelectCont(event) {
    var datePipe = new dateFormatPipe();
    event.data['fecha_publicacion']=datePipe.transform(event.data['fecha_publicacion']);
    this.newObjCont = false;
    this.contacto = this.cloneObjCont(event.data);
    this.displayDialogCont = true;
  }

  cloneObjCont(obj:any):any {
    let actual = new DescripObjCont('', '', new Date(), '');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }


}
class PrimeObj implements Vacante {

  constructor(public _id2, public id_perfil, public responsable, public descripcion, public cantidad, public fecha_contratacion,
              public estado_vacante, public fecha_nacimiento, public publicacion) {
  }
}
class DescripObjCont {

  constructor(public texto, public nombre, public fecha_publicacion, public tipo) {
  }
}
