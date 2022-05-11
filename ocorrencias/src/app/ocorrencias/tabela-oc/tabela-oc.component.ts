import { DialogDetalheOcComponent } from './../dialog-detalhe-oc/dialog-detalhe-oc.component';
import { HttpClient } from '@angular/common/http';
import { DialogOsComponent } from './../../ocorrencias/dialog-os/dialog-os.component';
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-tabela-oc',
  templateUrl: './tabela-oc.component.html',
  styleUrls: ['./tabela-oc.component.css']
})
export class TabelaOcComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['OCORRENCIA', 'LOJA', 'MOTIVO', 'SUBMOTIVO', 'ANALISTA', 'DATA', 'STATUS', 'ACAO'];
  dataSource :MatTableDataSource<Oc>
  result: any = []
 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private http  : ServicesService
  ){}

  openDialog(){
    this.dialog.open(DialogOsComponent,{
      width: '50%',
    }).afterClosed().subscribe(val => {
      if(val == 'save'){
        this.getOcorrencias()
      }
    })
  }

  openDialogDetalhe(id, _status, width){
    this.dialog.open(DialogDetalheOcComponent, {
     width: `${width}`
    })

    if(_status == 'Aberta') {
      this.http.detalheOc(id)
      
    } else {
      this.http.detalhesOcFina(id)
      
    }
   
  }

  ngOnInit(): void {
    this.getOcorrencias()
    
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  getOcorrencias(){
    this.http.getOcorrencias()
    .subscribe((res) => {     
      this.result = res
      this.dataSource = new MatTableDataSource(this.result)
      this.dataSource.paginator = this.paginator;
    })
  }
}


export interface Oc {
  OCORRENCIA: string;
  LOJA      : string;
  MOTIVO    : string;
  SUBMOTIVO : string;
  DATA      : string;
  STATUS    : string
} 

