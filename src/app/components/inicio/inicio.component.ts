import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  mostrar() {
    this.authService.loggedIn();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }


}
