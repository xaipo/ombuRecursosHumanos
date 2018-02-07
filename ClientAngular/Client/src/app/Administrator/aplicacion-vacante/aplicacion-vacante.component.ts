import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {AplicacionVacanteService} from '../../services/aplicacion-vacante.service';
import {AspiranteService} from '../../services/aspirante.service';
import {VacanteService} from '../../services/vacante.service';
import {EtapaService} from '../../services/etapa.service';
import {dateFormatPipe} from '../../pipes/datePipe';
import {AplicacionVacante} from "../../models/aplicacion-vacante";
import {UploadService} from '../../services/upload.service';

@Component({
	selector: 'app-aplicacion-vacante',
	templateUrl: './aplicacion-vacante.component.html',
	styleUrls: ['./aplicacion-vacante.component.css'],
	providers: [
		AspiranteService,
		VacanteService,
		AplicacionVacanteService,
		EtapaService,
		UploadService
	]
})
export class AplicacionVacanteComponent implements OnInit {
	public actual:AplicacionVacante;
	public selected:AplicacionVacante;
	public listado:any;
	public status:string;
	displayDialog:boolean;
	newObj:boolean;
	any:any;
	estados:any;
	public etapas:any;
	public contacto:DescripObjCont;
	public selectedCont:DescripObjCont;
	public listadoCont:any = [];
	displayDialogCont:boolean;
	newObjCont:boolean;
	public estados2:any;


	//campos subida imagen
	public url:string;
	public imageUnknow:string;
	public idToUpload:any;
	public selectImage:boolean;


	es:any; //variable para localizacion del calendar
	constructor(private _route:ActivatedRoute,
				private _router:Router,
				private _empleadoService:AplicacionVacanteService,
				private _vacante:VacanteService,
				private _aspirante:AspiranteService,
				private _etapaService:EtapaService,
				private _uploadService:UploadService) {
		this.actual = new AplicacionVacante('','', '', '', this.any, '', 0, []);
		this.listado = [];
		this.getAll();
		this.getAll2();
		this.estados = [
			{name: 'Rechazado', code: '0'},
			{name: 'Aceptado', code: '1'}

		];
		this.estados2 = [
			{name: 'Rechazado', code: '0'},
			{name: 'Aceptado', code: '1'}

		];

		this.url = GLOBAL.url;
		this.imageUnknow = "../../images/defaultMug.jpg";
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

	getAll2() {
		this._etapaService.getAll().subscribe(response => {
				this.etapas = response;
				console.log(this.etapas);
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
		this.actual = new AplicacionVacante('','', '', '', new Date(), '', 0, []);
		this.displayDialog = true;
		this.listadoCont = [];

		this.actual.cv_adjunto = 'unknow-001.png';

	}


	save() {
		if(!this.actual.fecha_solicitud){
			this.actual.fecha_solicitud = new Date();
		}

		let listado = [...this.listado];
		if (this.newObj) {
			// dependiente save
			this.actual.id_aspirante = this.empleado2._id;
			this.actual.id_vacante = this.empleado._id;

			this.actual.publicacion = this.listadoCont;

			this._empleadoService.save(this.actual).subscribe(
					response => {
					if (response) {

						if (this.selectImage == true) {
							//Subida de imagen
							this._uploadService.makeFileRequest(this.url + '/upload-curriculo/' + response._id, [], this.filesToUpload, 'image')
								.then((result:any) => {

									this.status = "success";
									this.actual = new AplicacionVacante('','', '', '', this.any, '', 0, []);
									this.listadoCont = [];
									this.empleado = '';
									this.empleado2 = '';
									this.getAll();
									this.filesToUpload = [];

								});
						} else {
							this.status = "success";
							this.actual = new AplicacionVacante('','', '', '',this.any, '', 0, []);
							this.listadoCont = [];
							this.empleado = '';
							this.empleado2 = '';
							this.getAll();
							this.filesToUpload = [];
						}



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
			this.actual.id_aspirante = this.empleado2._id;
			this.actual.id_vacante = this.empleado._id;
			this.actual.publicacion = this.listadoCont;

			this._empleadoService.update(this.actual).subscribe(
					response => {
					if (response) {
						console.log("idd: " + this.idToUpload);

						if (this.selectImage == true) {
							//Subida de imagen *******************************
							this._uploadService.makeFileRequest(this.url + '/upload-curriculo/' + this.idToUpload, [], this.filesToUpload, 'image')
								.then((result:any) => {

									this.status = "success";
									this.getAll()
									//listado[this.findSelectedIndex()] = this.actual;
									this.actual = new AplicacionVacante('','', '', '', this.any, '', 0, []);
									this.listadoCont = [];
									this.empleado = '';
									this.empleado2 = '';
									this.filesToUpload = [];
									this.selectImage = false;
								});
							//fin subida imagen ******************************
						} else {
							this.status = "success";
							this.getAll()
							//listado[this.findSelectedIndex()] = this.actual;
							this.actual = new AplicacionVacante('','', '', '', this.any, '', 0, []);
							this.listadoCont = [];
							this.empleado = '';
							this.empleado2 = '';
							this.filesToUpload = [];
						}


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
		this.actual = new AplicacionVacante('','', '', '', new Date(), '', 0, []);
		this.displayDialog = false;
	}

	delete() {
		let index = this.findSelectedIndex();
		this.listado = this.listado.filter((val, i) => i != index);
		this.actual = null;
		this.displayDialog = false;
	}

	close() {
		this.actual = new AplicacionVacante('','', '', '', this.any, '', 0, []);
		this.displayDialog = false;
		this.empleado = '';
		this.empleado2 = '';
		this.getAll();
	}

	onRowSelect(event) {

		var datePipe = new dateFormatPipe();
		if(event.data['fecha_solicitud']){
			event.data['fecha_solicitud'] = datePipe.transform(event.data['fecha_solicitud']);
		}else{
			event.data['fecha_solicitud'] = datePipe.transform(new Date());
		}


		this.newObj = false;
		this.actual = this.cloneObj(event.data);
		this.displayDialog = true;
		this.listadoCont = this.actual.publicacion;
		this.empleado = this.actual.id_vacante;
		this.empleado2 = this.actual.id_aspirante;

		if (this.actual.cv_adjunto == "") {
			this.actual.cv_adjunto = 'unknow-001.png';
		}
		this.idToUpload = this.actual._id;
	}

	cloneObj(obj:AplicacionVacante):AplicacionVacante {
		let actual = new PrimeObj('','', '', '', this.any, '', 0, []);
		for (let prop in obj) {
			actual[prop] = obj[prop];
		}
		return actual;
	}

	findSelectedIndex():number {
		return this.listado.indexOf(this.selected);
	}


	objs2:any[];
	filteredObjSingle2:any[];
	public empleado2:any;

	filterSingle2(event) {
		let query2 = event.query;
		this._aspirante.getAll().subscribe(objs2 => {
			//var auxObjs = objs;
			this.filteredObjSingle2 = this.filter2(query2, objs2);
		});
	}

	filter2(query2, objs2:any[]):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered2:any[] = [];
		for (let i = 0; i < objs2.length; i++) {
			let empleado2 = objs2[i];
			if (empleado2.primer_apellido.toLowerCase().indexOf(query2.toLowerCase()) == 0) {
				filtered2.push(empleado2);
			}
		}
		return filtered2;
	}


	//autocomplete
	objs:any[];
	filteredObjSingle:any[];
	public empleado:any;

	filterSingle(event) {
		let query = event.query;
		this._vacante.getAll().subscribe(objs => {
			//var auxObjs = objs;
			this.filteredObjSingle = this.filter(query, objs);
		});
	}

	filter(query, objs:any[]):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered:any[] = [];
		for (let i = 0; i < objs.length; i++) {
			let empleado = objs[i];
			if (empleado.descripcion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(empleado);
			}
		}
		return filtered;
	}


	showDialogToAddCont() {
		this.newObjCont = true;
		this.contacto = new DescripObjCont('', '', '', '');
		this.displayDialogCont = true;

	}

	saveCont() {
		console.log(this.contacto.id_etapa);
		let listadoCont = [...this.listadoCont];
		if (this.newObjCont)
			listadoCont.push(this.contacto);
		else
			listadoCont[this.findSelectedIndexCont()] = this.contacto;

		this.listadoCont = listadoCont;
		this.contacto = new DescripObjCont('', '', '', '');
		this.displayDialogCont = false;
	}

	deleteCont() {
		let index = this.findSelectedIndexCont();
		this.listadoCont = this.listadoCont.filter((val, i) => i != index);
		this.contacto = null;
		this.displayDialogCont = false;
	}

	onRowSelectCont(event) {
		this.newObjCont = false;
		this.contacto = this.cloneObjCont(event.data);
		this.displayDialogCont = true;
	}

	cloneObjCont(obj:any):any {
		let actual = new DescripObjCont('', '', '', '');
		for (let prop in obj) {
			actual[prop] = obj[prop];
		}
		return actual;
	}

	findSelectedIndexCont():number {
		return this.listadoCont.indexOf(this.selectedCont);
	}



	//funciones para imagenes ********************************************************************************************
	public filesToUpload:Array<File>;

	fileChangeEvent(fileInput:any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
		this.selectImage = true;
	}

	public downloadFile(){
		console.log('cv: ' + this.url + '/get-curriculo/' + this.actual.cv_adjunto);
		this.url + '/get-curriculo/' + this.actual.cv_adjunto;
	}

}

class PrimeObj implements AplicacionVacante {

	constructor(public _id, public id_vacante, public id_aspirante, public descripcion, public fecha_solicitud, public cv_adjunto, public estado,
				public publicacion) {
	}
}
class DescripObjCont {

	constructor(public id_etapa, public nota, public descripcion, public estado) {
	}
}
