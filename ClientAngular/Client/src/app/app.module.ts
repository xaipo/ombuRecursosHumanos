import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing,appRoutingProviders}from './app.router';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './Administrator/login/login.component';
import { DashBoardComponent } from './Administrator/dash-board/dash-board.component';
import { TestComponent } from './Administrator/test/test.component';
import { InicialComponent } from './Administrator/inicial/inicial.component';

import { PerfilTrabajoComponent } from './Administrator/perfil-trabajo/perfil-trabajo.component';
import {PanelMenuModule,MenuItem} from 'primeng/primeng';
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
    routing,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    MessagesModule,
    GrowlModule,
    PanelMenuModule,
    MessageModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
