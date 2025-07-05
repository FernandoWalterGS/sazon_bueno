import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  userId: number = 0;
  email: any = localStorage.getItem('email');
  user = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/),
    ]),
  });

  updateAccount() {
    const accountObject = {
      name: this.user.get('name')?.value,
      password: this.user.get('password')?.value,
    };
    this.accountService
      .updateAccountById(this.userId, accountObject)
      .subscribe((data) => {
        console.log(data);
      });

    this.user.reset();
    this.router.navigate(['/auth/login']);
  }
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.userId = params.id;
        this.accountService.getAccount(params.id).subscribe((account) => {
          const { name } = account;
          this.user.patchValue({ name: name });
        });
      }
    });
  }
}
