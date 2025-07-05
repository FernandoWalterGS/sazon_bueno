import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AccountLogin } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.API_URL;
  constructor(private http: HttpClient, private router: Router) {}

  loginAccount(login: AccountLogin): any {
    this.http.post<any>(`${this.apiUrl}/auth/login`, login).subscribe({
      next: (data) => {
        const { token, email, userId, name, isAdmin } = data;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('username', name);
        localStorage.setItem('id', userId);

        if (isAdmin) {
          this.router.navigate(['/admin/accounts']);
        } else {
          this.router.navigate(['/recipes']);
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!',
        });
      },
    });
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    this.router.navigate(['/auth/login']);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return token != null && token.length > 0;
  }
}
