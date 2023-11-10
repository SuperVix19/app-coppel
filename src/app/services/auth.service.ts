import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private url = 'https://app-coppel-api.onrender.com/api'


  constructor(private http: HttpClient, private router: Router) { }

  registro(user: any){
    return this.http.post(this.url + '/register', user);
  }

  inicioSesion(user: any){
    return this.http.post(this.url + '/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token');
  }

  cerrarSesion(){
    localStorage.removeItem('token' );
    this.router.navigate(['/inicio-sesion']);
  }
}
