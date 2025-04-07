import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private _router = inject(Router);
  private _auth = inject(AuthService);

  constructor() {}

  logout() {
    this._auth.logout();
    this._router.navigateByUrl('/auth');
  }
}
