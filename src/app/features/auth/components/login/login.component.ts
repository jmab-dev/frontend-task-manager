import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export default class LoginComponent implements OnInit{
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      console.log('Login exitoso');
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
    }
  }
}
