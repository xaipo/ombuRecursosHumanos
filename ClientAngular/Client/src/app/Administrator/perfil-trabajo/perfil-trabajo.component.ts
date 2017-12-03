import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {PerfilTrabajoService} from '../../services/perfil-trabajo.service';
import {PerfilTrabajo} from '../../models/perfil-trabajo';
import {DataTableModule,SharedModule} from 'primeng/primeng';


@Component({
  selector: 'app-perfil-trabajo',
  templateUrl: './perfil-trabajo.component.html',
  styleUrls: ['./perfil-trabajo.component.css'],
  providers : [PerfilTrabajoService]

})



export class PerfilTrabajoComponent implements OnInit {

  public perfilTrabajo : PerfilTrabajo;
  public perfilesTrabajo : any;
  public status : string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _perfilTrabajoService: PerfilTrabajoService
  ) {
    this.perfilTrabajo = new PerfilTrabajo('','','','','','',[],[]);

    this.perfilesTrabajo=[] ;

    this._perfilTrabajoService.getAll().subscribe(response =>{
        this.perfilesTrabajo = response;
        console.log(this.perfilesTrabajo);
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );

  }

  ngOnInit() {
  }



}
