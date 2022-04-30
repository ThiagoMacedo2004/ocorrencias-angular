import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome        : any = []
  mostrarMenu : boolean

  constructor(
    private http   : ServicesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    
    this.http.mostrarHeader.subscribe(
      (mostrar) => {
        if(mostrar){
          console.log('header')
          this.mostrarMenu = mostrar
          this.nome = this.http.getuser()
          console.log(this.nome.nome)
        }
      }
    )
  }

  logout() {
    this.mostrarMenu = false
    this.http.exit(this.router.url)
    
  }

}
