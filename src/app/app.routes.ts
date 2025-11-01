import { Routes } from '@angular/router';
import { ClienteForm } from './pages/cliente/cliente-form';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'clientes', component: ClienteForm}
];
