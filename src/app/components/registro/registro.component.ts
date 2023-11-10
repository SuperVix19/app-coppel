import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import Swal from 'sweetalert2';

const isStrongPassword = (password: string) => {
  // Check for at least 10 characters
  if (password.length < 10) {
    return false;
  }

  // Check for at least one digit (number)
  if (!/\d/.test(password)) {
    return false;
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return false;
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // If all checks pass, the password is strong
  return true;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terminosCondiciones: false,
    typeOfPassword: '',
    phoneNumber: '',
  }

  
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
  }
  
  
  register() {
    var miFormulario = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.min(10)]],
      terminosCondiciones: [this.user.terminosCondiciones, Validators.requiredTrue],
      typeOfPassword: [this.user.typeOfPassword, Validators.requiredTrue],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
    })

    if (miFormulario.value.phoneNumber?.length != 10) {
      Swal.fire(
        'Ingrese un número de teléfono válido',
        'Número inválido, ingrese 10 dígitos',
        'warning'
      )
      return
    }

    if (!isStrongPassword(miFormulario.value.password as string)) {
      Swal.fire(
        'Ingrese una contraseña segura',
        'Que cuente con al menos 10 caracteres, un número, un caracter especial y una mayúscula',
        'warning'
      )
      return
    }

    if (miFormulario.value.firstName == "" || miFormulario.value.lastName == "" || miFormulario.value.email == "" || miFormulario.value.password == "" || miFormulario.value.terminosCondiciones == false || miFormulario.value.typeOfPassword == "" || miFormulario.value.phoneNumber == ""){
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
        )
    } else {
      this.authService.registro(this.user).subscribe(
        {
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/inicio']);
          },
          error: (err: any) => {
            if (err?.error === "El correo ya está registrado") {
              Swal.fire(
                'Correo existente',
                'El correo ya existe, ingrese otro correo',
                'warning'
              )
            }
            return
          },
        }
      )
    }
  }  
}
