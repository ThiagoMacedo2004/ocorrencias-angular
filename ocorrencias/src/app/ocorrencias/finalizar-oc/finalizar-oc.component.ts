import { Router } from '@angular/router';
import { Oc } from './../tabela-oc/tabela-oc.component';
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
  form        : any = {}
  userLogon   : any = []
  retorno     : any = []
  dia         : any
  diaSete     : any
  

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.detalhesOc = this.service.getDetalheOc()
    this.getUserss();
    this.getVeiculos();
    this.getUser()
    
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDate();
    let dia = new Date().getDate()
   
    // Prevent Saturday and Sunday from being selected.
    return  day !== dia
  };
  

  formulario() {
    this.formGroup = this.fb.group({
      data      : ['',  Validators.required],
      tecnico   : ['',  Validators.required],
      veiculo   : ['',  Validators.required],
      mouse     : [this.form.mouse    = 0],
      teclado   : [this.form.teclado  = 0],
      monitor   : [this.form.monitor  = 0],
      fonte     : [this.form.fonte    = 0],
      telefone  : [this.form.telefone = 0],
      cpu       : [this.form.cpu      = 0],
      impTef    : [this.form.impTef   = 0],
      hd        : [this.form.hd       = 0],
      cooler    : [this.form.cooler   = 0]
    })
  }

  finalizarOs(){
    
    const obj = {
      id_oc        : this.detalhesOc.id,
      analista     : this.form.analista,
      data         : this.getDate(),
      tecnicoAtend : this.form.tecnicoAtend,
      veiculo      : this.form.veiculo,
      mouse        : this.form.mouse   ? this.form.mouse   : 0,
      teclado      : this.form.teclado ? this.form.teclado : 0,
      monitor      : this.form.monitor ? this.form.monitor : 0,
      fonte        : this.form.fonte   ? this.form.fonte   : 0,
      telefone     : this.form.telefone? this.form.telefone: 0,
      cpu          : this.form.cpu     ? this.form.cpu     : 0,
      impTef       : this.form.impTef  ? this.form.impTef  : 0,
      hd           : this.form.hd      ? this.form.impTef  : 0,
      cooler       : this.form.cooler  ? this.form.cooler  : 0

    }
    
    console.log(obj)

    this.service.finalizarOc(JSON.stringify(obj)).subscribe({
      next:(retorno) => {
        this.retorno = retorno
        if(!this.retorno.sucesso){
          this.service.exibirMsgErro('Problema para finalizar a ocorrência.... Verifique com o Thiago')
          
        } else {
          this.service.exibirMsgSucesso('Ocorrência ' + this.detalhesOc.ocorrencia + ' finalizada com sucesso !!')
          this.router.navigate(['/home'])
        }
      },
      error:(e) => {
        this.service.exibirMsgErro(e)
      }
    })
  }

  getDate() {
    let data = new Date(this.form.data)

    let ano: any = data.getFullYear()
    let mes: any = (data.getMonth()) + 1
    let dia: any = data.getDate()

    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano}-${mes}-${dia}`
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

  getUser() {
    this.userLogon = this.service.getuser()
    this.form.analista = this.userLogon.id
  }

}
