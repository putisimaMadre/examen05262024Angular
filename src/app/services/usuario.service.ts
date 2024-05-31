import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private user?: Usuario
  urlEndPointLogin = "http://localhost:8081/api/login"
  urlEndPointUser = "http://localhost:8081/api/usuarios"
  urlEndPointBusquedaLetra = "http://localhost:8081/api/busquedaLetra"

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  
  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.urlEndPointUser);
  }

  getUsuarioEditar(login: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.urlEndPointUser+'/'+login)
  }

  getUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.urlEndPointLogin, usuario, {headers: this.httpHeaders}).pipe(
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

  saveUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.urlEndPointUser, usuario, {headers: this.httpHeaders})
  }

  get currentUser(): Usuario | undefined {
    if (!this.user) return undefined
    return  structuredClone (this.user)
  }

  busquedaLetra(letra: string): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.urlEndPointBusquedaLetra+'/'+letra)   
  }

  updateUsuarioS(usuario: any): Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.urlEndPointUser+'/'+usuario.login, usuario, {headers:this.httpHeaders})
  }

  deleteUsuario(login: string): Observable<Usuario>{
    return this.httpClient.delete<Usuario>(this.urlEndPointUser+'/'+login, {headers:this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
}