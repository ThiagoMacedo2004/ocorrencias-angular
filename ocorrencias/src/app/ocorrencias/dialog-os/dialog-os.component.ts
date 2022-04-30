import { HttpErrorResponse } from '@angular/common/http';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { matDialogAnimations, MatDialogRef } from '@angular/material/dialog';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dialog-os',
  templateUrl: './dialog-os.component.html',
  styleUrls: ['./dialog-os.component.css']
})
export class DialogOsComponent implements OnInit {

  formGroup   : any = FormGroup
  retorno     : any = []
  MatDialogRef: any;
  motivos     : any = []
  submotivos  : any = []
  submotivo =   new FormControl({value: ''}, Validators.required) //new FormControl({value:''})
  user          : any
  

  constructor(
    private fb: FormBuilder,
    private http: ServicesService,
    private dialoRef: MatDialogRef<DialogOsComponent>
    ) { }

  ngOnInit(): void {
    this.formulario()
    this.getMotivos()
    this.submotivo.reset({value: '', disabled: true})
    // this.submotivo.disable({onlySelf: true})
  }

  changeMotivo(evento: any){
    // 
    if(evento.value){
      this.getSubmotivos(evento.value)
    }

    if(!evento.value){
      this.submotivo.reset({value: '', disabled: true})
    } else {
      this.submotivo.reset({value: '', disabled: false})
    }
  }


  formulario() {
    this.formGroup = this.fb.group({
      ocorrencia: ['',  Validators.required],
      loja      : ['',  Validators.required],
      motivo    : ['',  Validators.required],
      submotivo    : this.submotivo,
      descricao : ['',  Validators.required],
      triagem   : ['',  Validators.required]
    })
  }

  gravarOs(){
   console.log(this.formGroup.value)
   const obj = JSON.stringify(this.formGroup.value)

   this.user = this.http.getuser()

   this.http.gravaOS(obj, this.user.id).subscribe({
     next:(res)=> {
       this.retorno = res
       if(!this.retorno.error){
        this.http.exibirMsgSucesso("Ocorrência: " + this.formGroup.value.ocorrencia + " Salva com sucesso!!");
        this.formGroup.reset();
        this.dialoRef.close('save')
        
       } else {
        this.http.exibirMsgErro(this.retorno.error);
        this.dialoRef.disableClose
       }
     }
   })
  }

  getMotivos(){
    this.http.getMotivos().subscribe({
      next:(result) => {
        console.log(result)
        this.motivos = result;
      },error: (e: HttpErrorResponse) => {
        this.http.exibirMsgErro(e.message)
      }
    })
  }

  getSubmotivos(idMotivo){  
    this.http.getSubmotivos(idMotivo).subscribe({
      next:(result) => {
        this.submotivos = result;
      },error: (e: HttpErrorResponse) => {
        this.http.exibirMsgErro(e.message)
      }
    })
  }

  
}
