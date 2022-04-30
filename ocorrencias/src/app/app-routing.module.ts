import { AppComponent } from './app.component';
import { LoginComponent } from './ocorrencias/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaOcComponent } from './ocorrencias/tabela-oc/tabela-oc.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: "", redirectTo: 'home', pathMatch: 'full' ,
    canActivate: [AuthGuard]
  },

  { 
    
    path:"login", pathMatch: 'full', component: LoginComponent,
    // canActivate: [AuthGuard]
    
  },

  {
    path:"home",
    component:TabelaOcComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
