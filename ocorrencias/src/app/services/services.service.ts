import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, pipe } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  // private URL = 'http://localhost/angular-php/index.php'
  private URL = '//10.20.11.151/angular-php/index.php'
  resposta: any = []
  user    : any = []
  users   : any = []
  userAuth: boolean = false

  confgMsgError: MatSnackBarConfig = {
    panelClass         : ['error'],
    horizontalPosition : 'center',
    verticalPosition   : 'top',
    duration           : 10000
  }

  confgMsgsuccess: MatSnackBarConfig = {
    panelClass         : ['success'],
    horizontalPosition : 'center',
    verticalPosition   : 'top',
    duration           : 5000
  }

  public mostrarHeader = new EventEmitter<boolean>()

  constructor(
    private http   : HttpClient,
    private router : Router,
    private msg    : MatSnackBar
    ) { }

  
  gravaOS(obj: any, id: any){
    return this.http.post(this.URL, obj,{
      params: {
        acao : 'gravarOS',
        id   : id 
      }
    })
  }
  
  finalizarOc(obj: any) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'finalizarOc'
      }
    })
  }

  getOcorrencias(){
    return this.http.get(this.URL, {
      params: {
        acao: 'getOcorrencias'
      }
    })
  }

  getMotivos(){
    return this.http.get(this.URL, {
      params: {
        acao: 'getMotivos'
      }
    })
  }

  getSubmotivos(idMotivo){
    return this.http.get(this.URL, {
      params: {
        acao: 'getSubmotivos',
        id  : idMotivo
      }
    })
  }

  public detalheOc(idOc){
    return this.http.get(this.URL, {
      params: {
        acao: 'detalheOc',
        id  : idOc
      }
    }).subscribe({
      next: (data) => {
        if(data){
          this.resposta = data
        } else{
          this.exibirMsgErro('Erro ao verificar os detalhes da ocorrência...')
        }
      }, error: (e) => {
        this.exibirMsgErro(e)
      }
    })
  }

  public detalhesOcFina(idOc){
    return this.http.get(this.URL, {
      params: {
        acao: 'detalhesOcFina',
        id  : idOc
      }
    }).subscribe({
      next: (data) => {
        if(data){
          this.resposta = data
        } else{
          this.exibirMsgErro('Erro ao verificar os detalhes da ocorrência...')
        }
      }, error: (e) => {
        this.exibirMsgErro(e)
      }
    })
  }

  public getDetalheOc() {
    return this.resposta[0]
  }

  public getUsers() {
    return this.http.get(this.URL, {
      params: {
        acao: 'getUsers'
      }
    })
  }

  public getVeiculos() {
    return this.http.get(this.URL, {
      params: {
        acao: 'getVeiculos'
      }
    })
  }


  public login(dados, success) {
   
    return this.http.post(this.URL, dados, {
      params: {
        acao: 'login'
      }
    }).subscribe(
      (dados) => {
        this.validarHeader(dados, success)
      },(e: HttpErrorResponse) => {
        console.log(e.error.text)
        this.exibirMsgErro(e.error.text)
      }
    )
  }

  private validarHeader(dados, success){
    if(dados.error){
      this.getDados(dados, success)
      this.exibirMsgErro(dados.error)
      return this.mostrarHeader.emit(false)
    } else {
      this.getDados(dados, success)
      this.exibirMsgSucesso('Bem vindo, ' + dados.sucesso.nome)
      this.user = dados.sucesso
      this.userAuth = true
      this.mostrarHeader.emit(true)
      // this.router.navigate(['/home'])

    }
  }

  public verificarUserAuth() {
    return this.userAuth
  }

  public getDados(dados, success){
    if(dados){
      this.user = dados.sucesso
      return success(dados)
    } else{
      return success('Erro ao acessar o Banco de dados!!!')

    }
  }

  public getuser(){
    
    return this.user
   
  }

  public exibirMsgSucesso(msg: any){
    
    this.msg.open(msg, 'X', this.confgMsgsuccess)
  }

  public exibirMsgErro(msg: any){

    this.msg.open(msg, 'X', this.confgMsgError)
  }

  public verificarUrl(url: any){
    if(url == '/login'){
            
      this.mostrarHeader.emit(false)
      
    } else {
      this.mostrarHeader.emit(true)
      this.router.navigate(['/ocorrencias'])
    }
  }

  public exit(url: any = '') {
    this.userAuth = false
    this.mostrarHeader.emit(false)
    this.router.navigate(['/login'])

  }



}


