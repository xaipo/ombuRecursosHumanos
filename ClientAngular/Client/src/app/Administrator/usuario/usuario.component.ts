import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UsuarioService} from '../../services/usuario.service';
import {EmpleadoService} from '../../services/empleado.service';
import {Usuario} from '../../models/usuario';

import {RolService} from '../../services/rol.service';
import {EmpresaService} from '../../services/empresa.service';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css'],
	providers: [
		UsuarioService,
		EmpleadoService,
		RolService,
		EmpresaService
	]
})
export class UsuarioComponent implements OnInit {



	public actual:Usuario;
	public selected:Usuario;
	public listado:any;
	public status:string;
	displayDialog:boolean;
	newObj:boolean;
	any:any;

	constructor(private _route:ActivatedRoute,
				private _router:Router,
				private _usuarioService:UsuarioService,
				private _empleadoService:EmpleadoService,
				private _rolService:RolService,
				private _empresaService:EmpresaService
	) {
		this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
		this.listado = [];
		this.getAll();
	}

	ngOnInit() {
	}

	getAll() {
		this._usuarioService.getAll().subscribe(response => {
				this.listado = response.users;
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
		this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
		this.displayDialog = true;
		this.empleado = null;
		this.rol = null;
		this.empresa = null;

	}

	save() {
		let listado = [...this.listado];
		if (this.newObj) {
			// funcion save

			this.actual.id_empleado = this.empleado._id;
			this.actual.id_rol = this.rol._id;
			this.actual.id_empresa = this.empresa._id;
			this._usuarioService.save(this.actual).subscribe(
					response => {
					if (response) {
						this.status = "success";
						this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
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
			this.actual.id_empleado = this.empleado._id;
			this.actual.id_rol = this.rol._id;
			this.actual.id_empresa = this.empresa._id;
			this._usuarioService.update(this.actual).subscribe(
					response => {
					if (response) {
						this.status = "success";
						this.getAll();
						//listado[this.findSelectedIndex()] = this.actual;
						this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
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

		this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
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
		this.actual = new Usuario(this.any, this.any, this.any, this.any, '', '', '', '');
		this.displayDialog = false;
	}

	onRowSelect(event) {
		this.newObj = false;
		this.actual = this.cloneObj(event.data);
		this.displayDialog = true;
		this.empleado = this.actual.id_empleado;
		this.rol = this.actual.id_rol;
		this.empresa = this.actual.id_empresa;
	}

	cloneObj(obj:Usuario):Usuario {
		let actual = new PrimeObj('', '', '', '', '', '', '', '');
		for (let prop in obj) {
			actual[prop] = obj[prop];
		}
		return actual;
	}

	findSelectedIndex():number {
		return this.listado.indexOf(this.selected);
	}

	// FUNCIONES para el AUTOCOMPLETAR  **********************************************************************************
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


	// FUNCIONES para el AUTOCOMPLETAR ROL *****************************************************************************
	objsRol:any[];
	filteredObjSingleRol:any[];
	public rol:any;

	filterSingleRol(event) {
		let query = event.query;
		this._rolService.getAll().subscribe(objs => {
			//var auxObjs = objs;
			this.filteredObjSingleRol = this.filterRol(query, objs);
		});
	}

	filterRol(query, objs:any[]):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered:any[] = [];
		for (let i = 0; i < objs.length; i++) {
			let rol = objs[i];
			if (rol.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(rol);
			}
		}
		return filtered;
	}

	// FUNCIONES para el AUTOCOMPLETAR EMPRESA *************************************************************************
	objsEmpr:any[];
	filteredObjSingleEmpr:any[];
	public empresa:any;

	filterSingleEmpr(event) {
		let query = event.query;
		this._empresaService.getAll().subscribe(objs => {
			//var auxObjs = objs;
			this.filteredObjSingleEmpr = this.filterEmpr(query, objs);
		});
	}

	filterEmpr(query, objs:any[]):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered:any[] = [];
		for (let i = 0; i < objs.length; i++) {
			let empresa = objs[i];
			if (empresa.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(empresa);
			}
		}
		return filtered;
	}

}

class PrimeObj implements Usuario {

	constructor(public _id, public id_empleado, public id_rol, public id_empresa, public nombres_usuario, public username,
				public password, public estado) {
	}
}