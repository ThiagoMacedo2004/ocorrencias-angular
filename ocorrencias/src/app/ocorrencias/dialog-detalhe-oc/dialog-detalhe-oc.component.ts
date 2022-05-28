import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-dialog-detalhe-oc',
  templateUrl: './dialog-detalhe-oc.component.html',
  styleUrls: ['./dialog-detalhe-oc.component.css']
})
export class DialogDetalheOcComponent implements OnInit {

  public detalhesOc: any = []
  cor = ''

  constructor(
    private service: ServicesService,
    private dialoRef: MatDialogRef<DialogDetalheOcComponent>,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.dialoRef.afterOpened().subscribe({
      next: () => {
        this.detalhesOc = this.service.getDetalheOc()
        console.log(this.detalhesOc)
        if(this.detalhesOc.status == 'Aberta') {
          this.cor = 'red'
        } else {
          this.cor = 'green'
          console.log(this.detalhesOc, 'teste detalhes oc fina')
        }
      }
    })
  }


  finalizarOc(){
    this.router.navigate(['/finalizarOc'])
  }

}
