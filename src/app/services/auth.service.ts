import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private url = 'http://localhost:3000/api'
  router: any;


  constructor(private http: HttpClient) { }

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
    this.router.navigate(['/signin']);
  }
}
