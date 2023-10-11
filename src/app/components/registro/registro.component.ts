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
  }

  
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
  }
  
  
  register() {
    var miFormulario = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(18)]]
    })
    
    if (miFormulario.value.firstName == "" || miFormulario.value.lastName == "" || miFormulario.value.email == "" || miFormulario.value.password == ""){
      Swal.fire(
        'Ingrese todos los campos',
        'Llene todos los campos obligatorios',
        'warning'
      )
    }else{
      this.authService.registro(this.user).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/inicio']);
        }
      )
    }
  }
    
    
}
