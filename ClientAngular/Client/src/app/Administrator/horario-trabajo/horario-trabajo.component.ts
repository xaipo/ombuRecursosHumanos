import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {HorarioTrabajoService} from '../../services/horario-trabajo.service';
import {HorarioTrabajo} from '../../models/horario-trabajo';


@Component({
  selector: 'app-horario-trabajo',
  templateUrl: './horario-trabajo.component.html',
  styleUrls: ['./horario-trabajo.component.css'],
  providers: [
    HorarioTrabajoService
  ]
})
export class HorarioTrabajoComponent implements OnInit {
  public actual:HorarioTrabajo;
  public selected:HorarioTrabajo;
  public listado:any;
  public status:string;
  displayDialog:boolean;
  newObj:boolean;
  any:any;

  public hora_entrada: any;
  public hora_salida: any;

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _horarioTrabajoService:HorarioTrabajoService) {
    this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');
    this.listado = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this._horarioTrabajoService.getAll().subscribe(response => {

        this.listado = response;
        var n = this.listado.length;
        for(var i=0; i<n; i++)
        {
          this.listado[i].hora_entrada_leyenda = new Date(this.listado[i].hora_entrada).toLocaleTimeString();
          this.listado[i].hora_salida_leyenda = new Date(this.listado[i].hora_salida).toLocaleTimeString();

        }

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
    this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');
    this.displayDialog = true;

    this.hora_entrada = null;
    this.hora_salida = null;

  }


  save() {
    //let listado = [...this.listado];
    if (this.newObj) {
      // funcion save
      this.actual.hora_entrada = this.hora_entrada;
      this.actual.hora_salida = this.hora_salida;
      this._horarioTrabajoService.save(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');
            this.getAll();


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
      this.actual.hora_entrada = this.hora_entrada;
      this.actual.hora_salida = this.hora_salida;
      this._horarioTrabajoService.update(this.actual).subscribe(
          response => {
          if (response) {
            this.status = "success";
            this.getAll();
            this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');

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
    this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');
    this.displayDialog = false;

  }

  delete() {
    let index = this.findSelectedIndex();
    this.listado = this.listado.filter((val, i) => i != index);
    this.actual = null;
    this.displayDialog = false;
  }
  close() {
    this.actual = new HorarioTrabajo(this.any, '','',this.any,this.any,'','');
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newObj = false;
    this.actual = this.cloneObj(event.data);
    this.hora_entrada =new Date(this.actual.hora_entrada);
    this.hora_salida = new Date(this.actual.hora_salida);

    this.displayDialog = true;
  }

  cloneObj(obj:HorarioTrabajo):HorarioTrabajo {
    let actual = new PrimeObj('','','','','','','');
    for (let prop in obj) {
      actual[prop] = obj[prop];
    }
    return actual;
  }

  findSelectedIndex():number {
    return this.listado.indexOf(this.selected);
  }
}

class PrimeObj implements HorarioTrabajo {

  constructor(public _id, public nombre, public descripcion, public hora_entrada, public hora_salida, public hora_entrada_leyenda, public hora_salida_leyenda) {
  }
}
