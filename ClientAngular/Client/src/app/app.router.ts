/**
 * Created by xaipo on 11/22/2017.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {DashBoardComponent} from "./Administrator/dash-board/dash-board.component";
import {LoginComponent} from "./Administrator/login/login.component";
import {TestComponent} from "./Administrator/test/test.component";
import {InicialComponent} from "./Administrator/inicial/inicial.component";
import {PerfilTrabajoComponent} from "./Administrator/perfil-trabajo/perfil-trabajo.component";


const appRoutes:Routes = [
  {
    path: 'dashboard', component: DashBoardComponent,
    children: [
      {
        path: 'admin',
        component: TestComponent
      },
      {
        path: 'perfilTrabajo',
        component: PerfilTrabajoComponent
      },
      {
        path: '**',
        component: InicialComponent

      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent},
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
