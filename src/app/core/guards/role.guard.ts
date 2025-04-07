import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)

  if(!auth.isLoggedIn()) {
    return false
  }
  const allowedRoles = route.data['roles'] as string[];
  const userRoles = auth.getUserRoles()
  const allowed = allowedRoles.some(role => userRoles.includes(role));
  if(!allowed) {
    alert(`Sorry, you don't have access to this page.`)
  }
  return allowed
};
