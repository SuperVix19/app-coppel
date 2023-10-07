import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})

export class InicioSesionComponent implements OnInit {
  
  user = {
    email: '',
    password: '',
  }

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
  }

  inicioSesion() {
    this.authService.inicioSesion(this.user).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/inicio']);
      }
    )
  }
}
