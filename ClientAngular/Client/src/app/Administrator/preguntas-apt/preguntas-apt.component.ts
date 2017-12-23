import { Component, OnInit } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { EtapaService } from '../../services/etapa.service';
import { BancoPreguntas2Apt } from '../../models/banco-preguntas2Apt';
import { PreguntasAptService } from '../../services/preguntas-apt.service';

@Component({
  selector: 'app-preguntas-apt',
  templateUrl: './preguntas-apt.component.html',
  styleUrls: ['./preguntas-apt.component.css'],
  providers: [
    VacanteService,
    EtapaService,
    PreguntasAptService
  ]
})
export class PreguntasAptComponent implements OnInit {

  displayDialog = false;
  lstpreguntas: any[];
  objPregunta: BancoPreguntas2Apt;
  lstVacantes: any[];
  selectedVacante: any;
  lstEtapas: any[];
  selectedEtapas: any;
  any: any;
  lstRespuestas: any[];
  lstOpciones: any[];
  selectedOpciones: any;
  displayDialogR = false;
  descRespuesta;
  flagUpdate = false;
  selectedR: any;
  flagUpdateR = false;
  objRespuestas: any;

  constructor(private vacanteService: VacanteService,
    private etapaService: EtapaService,
    private preguntasAptService: PreguntasAptService) {

    this.objPregunta = new BancoPreguntas2Apt(this.any, this.any, '', this.any);
    this.lstOpciones = [{
      label: 'correcta',
      value: 1
    }, {
      label: 'incorrecta',
      value: 0
    }]
  }

  ngOnInit() {
    this.lstRespuestas = [];
    this.lstpreguntas = [];
    this.preguntasAptService.getAll().subscribe(data => {
      this.lstpreguntas = data;
    }, err => {
      console.log(err);
    })

    this.vacanteService.getAll().subscribe(data => {
      this.lstVacantes = data;
    }, err => {
      console.log(err);
    });

    this.etapaService.getAll().subscribe(data => {
      this.lstEtapas = data;
    }, err => {
      console.log(err);
    });
  }

  showDialogAdd() {
    this.flagUpdate = false;
    this.objPregunta = new BancoPreguntas2Apt(this.any, this.any, '', this.any);
    this.lstRespuestas = [];
    this.selectedVacante = '';
    this.selectedEtapas = '';
    this.displayDialog = true;
  }

  save() {
    if (!this.flagUpdate) {
      this.preguntasAptService.save(this.objPregunta).subscribe(data => {
        this.lstpreguntas = [...this.lstpreguntas, this.objPregunta];
        this.displayDialog = false;
      }, err => {
        console.log(err);
      });
    } else {
      this.preguntasAptService.update(this.objPregunta).subscribe(data => {
        this.displayDialog = false;
        this.ngOnInit();
      }, err => {
        console.log(err);
      })
    }
  }

  onChangeLstVacantes($event) {
    this.objPregunta.id_vacante = this.selectedVacante._id
  }

  onChangeLstEtapas($event) {
    this.objPregunta.id_etapa = this.selectedEtapas._id
  }

  saveR() {
    console.log(this.flagUpdateR)
    if (!this.flagUpdateR) {
      let aux = {
        respuesta: this.descRespuesta,
        correcta: this.selectedOpciones.value
      }
      this.lstRespuestas = [...this.lstRespuestas, aux];
      this.objPregunta.respuestas = [];
      this.objPregunta.respuestas = this.lstRespuestas;
    } else {
      let index = this.lstRespuestas.indexOf(this.objRespuestas);
      console.log(index);
      let aux = {
        respuesta: this.descRespuesta,
        correcta: this.selectedOpciones.value
      }
      this.lstRespuestas[index] = aux;
      this.lstRespuestas = [...this.lstRespuestas];
      this.displayDialogR = false;
    }

  }

  showDialogAddR() {
    this.flagUpdateR = false;
    this.displayDialogR = true;
  }

  onRowSelect(event) {
    this.flagUpdate = true;
    this.objPregunta = event.data;
    this.lstRespuestas = [];
    this.lstRespuestas = event.data.respuestas;
    event.data.id_vacante;
    let a = this.lstVacantes.filter(x => x._id == event.data.id_vacante._id);
    this.selectedVacante = a[0];
    let b = this.lstEtapas.filter(x => x._id == event.data.id_etapa._id);
    this.selectedEtapas = b[0];
    this.displayDialog = true;
  }

  onRowSelectR(event) {
    this.flagUpdateR = true;
    this.descRespuesta = event.data.respuesta;
    if (event.data.correcta == 1) {
      this.selectedOpciones = this.lstOpciones[0];
    } else {
      this.selectedOpciones = this.lstOpciones[1];
    }
    this.displayDialogR = true;
    this.objRespuestas = event.data;
  }

  delete() {
    let index = this.lstpreguntas.indexOf(this.objPregunta);
    this.lstpreguntas = this.lstpreguntas.filter((val, i) => i != index);
    this.displayDialog = false;
  }

  deleteR() {
    let index = this.lstRespuestas.indexOf(this.objRespuestas);
    this.lstRespuestas = this.lstRespuestas.filter((val, i) => i != index);
    this.displayDialogR = false;
    this.objPregunta.respuestas = [];
    this.objPregunta.respuestas = this.lstRespuestas;
  }

}
