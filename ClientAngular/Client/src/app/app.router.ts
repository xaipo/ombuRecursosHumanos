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
import {ModalidadTrabajoComponent} from "./Administrator/modalidad-trabajo/modalidad-trabajo.component";
import {CategoriaTrabajoComponent} from "./Administrator/categoria-trabajo/categoria-trabajo.component";
import {HorarioTrabajoComponent} from "./Administrator/horario-trabajo/horario-trabajo.component";
import {BancopreguntasPerfilComponent} from "./Administrator/bancopreguntas-perfil/bancopreguntas-perfil.component";
import {RolComponent} from "./Administrator/rol/rol.component";
import {EmpleadoComponent} from "./Administrator/empleado/empleado.component";
import {EmpresaComponent} from "./Administrator/empresa/empresa.component";
import {DepartamentoComponent} from "./Administrator/departamento/departamento.component";
import {CurriculoComponent} from "./Administrator/curriculo/curriculo.component";
import {VacanteComponent} from "./Administrator/vacante/vacante.component";
import {AspiranteComponent} from "./Administrator/aspirante/aspirante.component";
import {EtapaComponent} from "./Administrator/etapa/etapa.component";


const appRoutes:Routes = [
  {
    path: 'dashboard', component: DashBoardComponent,
    children: [
      {
        path: 'admin',
        component: TestComponent
      },
      {
        path: 'rol',
        component: RolComponent
      },
      {
        path: 'perfilTrabajo',
        component: PerfilTrabajoComponent
      },
      {
        path: 'modalidadTrabajo',
        component: ModalidadTrabajoComponent
      },
      {
        path: 'categoriaTrabajo',
        component: CategoriaTrabajoComponent
      },
      {
        path: 'horarioTrabajo',
        component: HorarioTrabajoComponent
      },
      {
        path: 'bancopreguntasPerfil',
        component: BancopreguntasPerfilComponent
      },
      {
        path: 'empleado',
        component: EmpleadoComponent
      },
      {
        path: 'empresa',
        component: EmpresaComponent
      },
      {
        path: 'departamento',
        component: DepartamentoComponent
      },
      {
        path: 'curriculo',
        component: CurriculoComponent
      },
      {
        path: 'vacante',
        component: VacanteComponent
      }, {
        path: 'aspirante',
        component: AspiranteComponent
      },
      {
        path: 'etapa',
        component: EtapaComponent
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
