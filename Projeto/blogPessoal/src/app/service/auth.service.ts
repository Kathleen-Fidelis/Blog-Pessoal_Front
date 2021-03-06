import { environment } from './../../environments/environment.prod';
import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  //O Observable mapeia o retorno do método.

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`${environment.server}/usuarios/${id}`)
  }

  logado(){
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }
}
