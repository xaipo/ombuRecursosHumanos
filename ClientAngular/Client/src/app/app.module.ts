import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing,appRoutingProviders}from './app.router';

// npPrime
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './Administrator/login/login.component';
import { DashBoardComponent } from './Administrator/dash-board/dash-board.component';
import { TestComponent } from './Administrator/test/test.component';
import { InicialComponent } from './Administrator/inicial/inicial.component';
import {AutoCompleteModule} from 'primeng/primeng';

import { PerfilTrabajoComponent } from './Administrator/perfil-trabajo/perfil-trabajo.component';
import { ModalidadTrabajoComponent } from './Administrator/modalidad-trabajo/modalidad-trabajo.component';
import { CategoriaTrabajoComponent } from './Administrator/categoria-trabajo/categoria-trabajo.component';
import { HorarioTrabajoComponent } from './Administrator/horario-trabajo/horario-trabajo.component';
import { BancopreguntasPerfilComponent } from './Administrator/bancopreguntas-perfil/bancopreguntas-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    TestComponent,
    InicialComponent,
    PerfilTrabajoComponent,
    ModalidadTrabajoComponent,
    CategoriaTrabajoComponent,
    HorarioTrabajoComponent,
    BancopreguntasPerfilComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    PanelModule,
    DataListModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    AutoCompleteModule,
    InputSwitchModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
