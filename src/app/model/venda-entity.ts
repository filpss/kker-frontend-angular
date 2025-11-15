import { Cliente } from './cliente-entity';

export interface Venda {
  id: number;
  valor: number | any;
  descricao: string | any;
  dataVenda: Date | string;
  cliente: Cliente | any;
}
