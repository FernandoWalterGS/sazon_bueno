import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const isUser = accountService.isAuth();
  if (isUser) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};
