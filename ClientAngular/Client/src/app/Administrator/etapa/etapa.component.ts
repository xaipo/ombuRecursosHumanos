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
    this.actual = new Etapa(this.any);
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
}
