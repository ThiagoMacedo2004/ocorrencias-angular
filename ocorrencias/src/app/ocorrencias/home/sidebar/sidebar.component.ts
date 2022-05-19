import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { DialogOsComponent } from '../../dialog-os/dialog-os.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user     : any
  pathFoto : any
  status   : string[] = ['Aberta(s)', 'Finalizada(s)'];
  test     : any = ''
  
  constructor(
    private dialog : MatDialog,
    private http   : ServicesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    
    this.user = this.http.getuser()
    console.log(this.user, 'sidebar')
    this.pathFoto = `assets/img_users/${this.user.matricula}.JPG`
  }

  openDialog(){
    // this.dialog.open(DialogOsComponent,{
    //   width: '50%',
    // }).afterClosed().subscribe(val => {
    //   if(val == 'save'){
    //     this.router.navigate(['/home'])
    //     console.log('teste sidebar')
    //   }
    // })
    this.router.navigate(['/gerarOs'])
  }

}
