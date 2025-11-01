import { Routes } from '@angular/router';
import { ClienteForm } from './components/cliente-form/cliente-form';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'clientes', component: ClienteForm}
];
