import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

Injectable({
  providedIn: 'root'
})

type user = {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
  
}

export class AuthService {

  private url = 'http://localhost:3000/api'


  constructor(private http: HttpClient) { }

  registro(user: user){
    return this.http.post(this.url + '/registro', user);
  }

  inicioSesion(user: user){
    return this.http.post(this.url + '/inicio-sesion', user);
  }
}
