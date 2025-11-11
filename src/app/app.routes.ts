import { Routes } from '@angular/router';
import { ClienteForm } from './pages/cliente/form/cliente-form';
import { Home } from './pages/home/home';
import { VendaForm } from './pages/venda/form/venda-form/venda-form';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'clientes', component: ClienteForm},
  {path: 'clientes/:id', component: ClienteForm},

  {path: 'venda', component: VendaForm},
  {path: 'venda/:id', component: VendaForm}
];
