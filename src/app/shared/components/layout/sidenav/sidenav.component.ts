import { Component, Input, computed, signal } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from './MenuItem';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'داشبورد',
      route: 'dashboard',
    },
    {
      icon: 'apps',
      label: 'دسته بندی محصولات',
      route: 'product-categories',
    },
  ]);

  sidenavCollapsed = signal<boolean>(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  setProfilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));
}
