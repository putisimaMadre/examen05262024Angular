import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private user?: Usuario
  urlEndPoin = "http://localhost:8081/api/login"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  
  constructor(private httpClient: HttpClient) { }

  getUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.urlEndPoin, usuario, {headers: this.httpHeaders}).pipe(
      tap (user =>  this.user = user),
        
      tap (user => localStorage.setItem('token', user.login.toString() )),
      catchError(e => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Verificar informacion de entrada!",
          footer: '<a href="/auth" routerLink="/auth">Ya tienes cuenta?</a>'
        });
        return throwError(() => e);
      })
    )
  }

  get currentUser(): Usuario | undefined {
    if (!this.user) return undefined
    return  structuredClone (this.user)
  }
}