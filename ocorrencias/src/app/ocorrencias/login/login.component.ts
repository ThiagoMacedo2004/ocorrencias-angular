import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: any = FormGroup
  resposta : any = []
  url      : string
  

  constructor(
    private router: Router,
    private fb     : FormBuilder,
    private http   : ServicesService,
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.verificarUrl()
  }

  formulario(){
    this.formGroup = this.fb.group({
      matricula : ['', Validators.required],
      senha     : ['', Validators.required]
    })
  }

  acessarSistema(){
    console.log(this.formGroup.value)
    const obj = JSON.stringify(this.formGroup.value)

    this.http.login(obj, (dados) => {
      this.resposta = dados
      console.log(this.resposta.error)
    })
  }

  verificarUrl() {
    this.url = this.router.url
    this.http.verificarUrl(this.url)
    this.http.mostrarHeader.subscribe(
      (res) => {
        if(res) {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/'])
        }
      }
    )
  }

}
