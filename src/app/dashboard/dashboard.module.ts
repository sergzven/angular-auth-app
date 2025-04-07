import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterOutlet,
    HlmBadgeDirective,
  ],
})
export class DashboardModule {}
