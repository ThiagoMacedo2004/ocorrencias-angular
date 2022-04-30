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

  constructor(
    private service: ServicesService,
    private dialoRef: MatDialogRef<DialogDetalheOcComponent>
  ) { }
  ngOnInit(): void {
    this.dialoRef.afterOpened().subscribe({
      next: () => {
        this.detalhesOc = this.service.getDetalheOc()
      }
    })
  }
}
