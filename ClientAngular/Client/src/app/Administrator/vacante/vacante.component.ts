import { Component, OnInit } from '@angular/core';
import {Vacante} from '../../models/vacante';
import {VacanteService} from "../../services/vacante.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Publicacion} from "../../models/publicacion";
@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.component.html',
  styleUrls: ['./vacante.component.css'],
  providers: [
    VacanteService
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

  es:any; //variable para localizacion del calendar
  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _vacanteService:VacanteService) {

    this.actual = new Vacante('','','','',0,new Date(),0,[]);
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

}
