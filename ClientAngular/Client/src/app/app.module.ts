import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing,appRoutingProviders}from './app.router';
import {DataTableModule,SharedModule} from 'primeng/primeng';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './Administrator/login/login.component';
import { DashBoardComponent } from './Administrator/dash-board/dash-board.component';
import { TestComponent } from './Administrator/test/test.component';
import { InicialComponent } from './Administrator/inicial/inicial.component';
import { MaterializeModule } from 'angular2-materialize';
import { PerfilTrabajoComponent } from './Administrator/perfil-trabajo/perfil-trabajo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    TestComponent,
    InicialComponent,
    PerfilTrabajoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing,
    FormsModule,
    DataTableModule,
    SharedModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
