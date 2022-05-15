import { ServicesService } from 'src/app/services/services.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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
   
  ) { }

  ngOnInit(): void {
  
  }

  logout(): void {
    this.mostrarMenu = false
    this.http.exit()
    
  }

  
}
