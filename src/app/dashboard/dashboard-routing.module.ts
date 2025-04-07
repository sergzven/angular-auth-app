import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./components/dashboard-home/dashboard-home.component').then(c => c.DashboardHomeComponent)
      },
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['admin']},
        loadComponent: () => import('./components/admin-component/admin-component.component').then(c => c.AdminComponentComponent),
      },
      {
        path: 'manager',
        canActivate: [RoleGuard],
        data: { roles: ['manager']},
        loadComponent: () => import('./components/manager-component/manager-component.component').then(c => c.ManagerComponentComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
