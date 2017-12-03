import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './Administrator/login/login.component';
import { DashBoardComponent } from './Administrator/dash-board/dash-board.component';
import {routing,appRoutingProviders}from './app.router';
import { TestComponent } from './Administrator/test/test.component';
import { InicialComponent } from './Administrator/inicial/inicial.component';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    TestComponent,
    InicialComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    routing,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
