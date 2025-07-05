import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginError: boolean = false;
  error: boolean = false;
  msg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  accountLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/),
    ]),
  });

  onSubmit() {
    const { email, password } = this.accountLogin.value;

    if (email && password) {
      this.loginError = this.authService.loginAccount({
        email,
        password,
      });
      console.log(this.loginError);
    }
  }

  changePath() {
    this.router.navigate(['/auth/register']);
  }
}
