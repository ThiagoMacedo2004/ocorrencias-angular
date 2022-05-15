import { FinalizarOcComponent } from './ocorrencias/finalizar-oc/finalizar-oc.component';
import { LoginComponent } from './ocorrencias/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaOcComponent } from './ocorrencias/tabela-oc/tabela-oc.component';
import { AuthGuard } from './guards/auth.guard';
import { GerarOsComponent } from './ocorrencias/gerar-os/gerar-os.component';


const routes: Routes = [

  {
    path: "", redirectTo: 'ocorrencias', pathMatch: 'full' ,
    canActivate: [AuthGuard]
  },

  { 
    
    path:"login", pathMatch: 'full', component: LoginComponent,
    // canActivate: [AuthGuard]
    
  },

  {
    path:"ocorrencias",
    component:TabelaOcComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"gerarOs",
    component:GerarOsComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"finalizarOc",
    component:FinalizarOcComponent,
    canActivate: [AuthGuard]
  }, 

  {
    path:"**", redirectTo: 'ocorrencias', pathMatch: 'full' ,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
