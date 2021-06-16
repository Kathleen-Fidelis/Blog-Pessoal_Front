import { AlertasService } from './../service/alertas.service';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.mostrarSenha()
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo

      this.router.navigate(['/inicio'])
    }, erro =>{
      if (erro.status == 500) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
    })
  }

  mostrarSenha() {
    let btn = document.querySelector('.fa-eye')

    btn?.addEventListener('click', () => {
      let inputSenha = document.querySelector('#senha')

      if (inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text')
      } else {
        inputSenha?.setAttribute('type', 'password')
      }
    })
  }

}
