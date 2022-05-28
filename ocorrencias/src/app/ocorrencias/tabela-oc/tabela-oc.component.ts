import { Router } from '@angular/router';
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

  displayedColumns : string[] = ['LOJA','OCORRENCIA', 'MOTIVO', 'SUBMOTIVO', 'ANALISTA', 'DATA', 'STATUS', 'ACAO'];
  dataSource       : MatTableDataSource<Oc>
  result           : any = []
  cor              : any = ''
  user             : any
  ocorrencia       : any = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog : MatDialog,
    private http   : ServicesService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.getOcorrencias()
    
  }

  openDialog(){
    this.dialog.open(DialogOsComponent,{
      width: '50%',
    }).afterClosed().subscribe(val => {
      if(val == 'save'){
        this.getOcorrencias()
      }
    })
  }

  openDialogDetalhe(id, _status, acao){
    if(_status == 'Aberta') {
      this.http.detalheOc(id, acao = '')
      
    } else {
      this.http.detalhesOcFina(id)
      
    }
   
  }

  encaminharOs(id) {
    this.user = this.http.getuser()

    this.http.getDetaOcEncaminhar(id).subscribe({
      next: (data) => {
        if(data) {
          this.user     = this.http.getuser()
          let oc        = data[0].ocorrencia
          let remetente = this.user.email
          let loja      = data[0].loja
          this.http.reenviarPDF(remetente, oc, loja)
          this.http.exibirMsgSucesso(`O.S ${data[0].ocorrencia}, Loja: ${data[0].loja}, enviada com sucesso !!`)
        }

      }
    })
    
  }

  

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  getOcorrencias(){
    this.http.getOcorrencias()
    .subscribe((res) => {     
      this.result = res
      console.log(this.result)
      this.dataSource = new MatTableDataSource(this.result)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

