import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 

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

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
  }

  register() {
    this.authService.registro(this.user).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/inicio']);
      }
    )
  }

}
