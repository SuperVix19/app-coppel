import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})

export class InicioSesionComponent implements OnInit {
  
  user = {
    email: '',
    password: '',
    typeOfPassword: '',
  }

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
  }

  inicioSesion() {
    var miFormulario = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.min(10)]],
      typeOfPassword: [this.user.typeOfPassword, Validators.requiredTrue],
    })

    if (miFormulario.value.email == "" || miFormulario.value.password == "" || miFormulario.value.typeOfPassword == ""){
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
        )
    } else {
      this.authService.inicioSesion(this.user).subscribe(
        {
          error: (err: any) => {
            if (err?.error === "El correo no existe") {
              Swal.fire(
                'Correo no existente',
                'El correo no se encuentra registado',
                'warning'
              )
            }
            if (err?.error === "Contraseña incorrecta") {
              Swal.fire(
                'La contraseña es incorrecta',
                'Por favor, ingrese la contraseña correcta',
                'warning'
              )
            }
          },
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/inicio']);
          },
        }
      )
    }
  }
}
