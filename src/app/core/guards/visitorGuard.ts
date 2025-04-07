import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const VisitorGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.isLoggedIn()) {
    router.navigateByUrl('/dashboard');
    return false
  }

  return true;
};
