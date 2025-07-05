import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account/account.service';
import { Category } from '../../services/category/category.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgIcon],
  providers: [
    provideIcons({
      heroEye,
      heroEyeSlash,
    }),
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  viewPassword: boolean = false;
  categoryData: Category[] = [];
  constructor(private router: Router, private accountService: AccountService) {}

  accountForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/),
    ]),
    username: new FormControl('', [Validators.required, Validators.email]),
    date_of_birth: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/),
    ]),
  });

  onSubmit() {
    const account: any = this.accountForm.value;
    this.accountService.registerAccount(account).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cuenta creada satisfactoriamente',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.accountForm.reset();
          this.router.navigate(['/auth/login']);
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al crear la cuenta',
          text: 'Ha ocurrido un problema al intentar crear la cuenta. Por favor, inténtalo de nuevo.',
          showConfirmButton: true,
        });
      },
    });
  }

  changeViewPassword() {
    this.viewPassword = !this.viewPassword;
  }
}
