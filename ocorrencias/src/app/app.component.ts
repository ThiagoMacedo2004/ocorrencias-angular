import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TabelaOcComponent } from './ocorrencias/tabela-oc/tabela-oc.component';
import { HeaderComponent } from './ocorrencias/header/header.component';
import { DialogOsComponent } from './ocorrencias/dialog-os/dialog-os.component';
import { ServicesService } from './services/services.service';
import { LoginComponent } from './ocorrencias/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit {
  title = 'ocorrencias';

  mostrarMenu: boolean = false;

  time: any

  constructor(
    private services: ServicesService,
    private router  : Router
  ){

  }
  ngAfterViewInit(): void {
    // this.services.verificarUrl(this.router.url)

    // this.services.mostrarHeader.subscribe(
    //   (mostrar) => {
    //     if(mostrar){
    //       console.log('true')
    //       this.mostrarMenu = mostrar
    //     } else {
    //       console.log('teste falsa')
    //       // this.router.navigate(['/login'])
    //     }
    //   }
    // )
  }
 
  
}
