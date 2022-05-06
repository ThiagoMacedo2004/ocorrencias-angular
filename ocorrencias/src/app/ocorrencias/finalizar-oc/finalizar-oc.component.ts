import { HttpErrorResponse } from '@angular/common/http';
import { ServicesService } from 'src/app/services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finalizar-oc',
  templateUrl: './finalizar-oc.component.html',
  styleUrls: ['./finalizar-oc.component.css']
})
export class FinalizarOcComponent implements OnInit {
  
  formGroup   : any = FormGroup
  detalhesOc  : any = []
  users       : any = []
  veiculos    : any = []

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    private http: ServicesService,
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.detalhesOc = this.service.getDetalheOc()
    this.getUserss();
    this.getVeiculos();
  }

  formulario() {
    this.formGroup = this.fb.group({
      data      : ['',  Validators.required],
      tecnico   : ['',  Validators.required],
      veiculo   : ['',  Validators.required],
      mouse     : ['0',  Validators.required],
      teclado   : ['0',  Validators.required],
      monitor   : ['0',  Validators.required],
      fonte     : ['0',  Validators.required],
      telefone  : ['0',  Validators.required],
      cpu       : ['0',  Validators.required],
      impTef    : ['0',  Validators.required],
      hd        : ['0',  Validators.required],
      cooler    : ['0',  Validators.required],
    })
  }
  finalizarOs(){
    console.log(this.formGroup.value)
    let data = new Date(this.formGroup.value.data)
    let dataF = (data.getFullYear() + "-" + ((data.getUTCMonth()) + 1) + "-" + data.getDate())
    console.log(dataF)
    console.log(this.formGroup.value.data)
  }


  getUserss(){
   this.service.getUsers().subscribe(
     (dados) => {
       this.users = dados
       console.log(this.users)
     },
     (e:HttpErrorResponse) => {
       this.service.exibirMsgErro(e.message)
     }
   )
  }

  getVeiculos() {
   this.service.getVeiculos().subscribe(
     (dados) => {
       this.veiculos = dados
     },
     (e:HttpErrorResponse) => {
       this.service.exibirMsgErro(e.message)
     }
   )
  }

}
