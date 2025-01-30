import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private readonly user = 'admin';
  private readonly pwd = 'admin123';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.user && password === this.pwd) {
      localStorage.setItem('user', 'admin');
      this.router.navigate(['/tasks']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

}