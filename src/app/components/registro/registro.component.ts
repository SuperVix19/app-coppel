import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import Swal from 'sweetalert2';

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
  }

  
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
  }
  
  
  register() {
    var miFormulario = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.min(7)]],
      terminosCondiciones: [this.user.terminosCondiciones, Validators.requiredTrue]
    })

    if (miFormulario.value.firstName == "" || miFormulario.value.lastName == "" || miFormulario.value.email == "" || miFormulario.value.password == "" || miFormulario.value.terminosCondiciones == false){
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
        )
        
      }else{
        this.authService.registro(this.user).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/inicio']);
          }
        )

        if(miFormulario.value.email == this.user.email){
          Swal.fire(
            'Correo existente',
            'El correo ya existe, ingrese otro correo',
            'warning'
          ) 
        }
    }
  }
    
    
}
