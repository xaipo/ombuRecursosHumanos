import { Component, OnInit } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { EtapaService } from '../../services/etapa.service';
import { BancoPreguntas2Tec } from '../../models/banco-preguntas2Tec';
import { PreguntasTecService } from '../../services/preguntas-tec.service';

@Component({
  selector: 'app-preguntas-tec',
  templateUrl: './preguntas-tec.component.html',
  styleUrls: ['./preguntas-tec.component.css'],
  providers: [
    VacanteService,
    EtapaService,
    PreguntasTecService
  ]
})
export class PreguntasTecComponent implements OnInit {

  displayDialog = false;
  lstpreguntas: any[];
  objPregunta: BancoPreguntas2Tec;
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
    private preguntasTecService: PreguntasTecService) {
    this.objPregunta = new BancoPreguntas2Tec(this.any, this.any, '', this.any);
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
    this.preguntasTecService.getAll().subscribe(data => {
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
    this.objPregunta = new BancoPreguntas2Tec(this.any, this.any, '', this.any);
    this.lstRespuestas = [];
    this.selectedVacante = '';
    this.selectedEtapas = '';
    this.displayDialog = true;
  }

  save() {
    if (!this.flagUpdate) {
      this.preguntasTecService.save(this.objPregunta).subscribe(data => {
        this.lstpreguntas = [...this.lstpreguntas, this.objPregunta];
        this.displayDialog = false;
      }, err => {
        console.log(err);
      });
    } else {
      console.log(this.objPregunta)
      this.preguntasTecService.update(this.objPregunta).subscribe(data => {
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
    let a = this.lstVacantes.filter(x => x._id == event.data.id_vacante);
    this.selectedVacante = a[0];
    let b = this.lstEtapas.filter(x => x._id == event.data.id_etapa);
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
