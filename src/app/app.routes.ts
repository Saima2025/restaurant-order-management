import { Routes } from '@angular/router';
import { OrdersPage } from './orders/orders-page/orders-page';

export const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' }, // default route
  { path: 'orders', component: OrdersPage },    // orders page
  { path: '**', component: OrdersPage }, // 404 fallback
];
