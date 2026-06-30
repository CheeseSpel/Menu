import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Checkout } from './pages/checkout/checkout';
import { History } from './pages/history/history';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    component: Menu,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  {
    path: 'history',
    component: History,
  },
];
