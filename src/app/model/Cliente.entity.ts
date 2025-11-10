import { StatusCliente } from "../shared/enums/StatusCliente";

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  isAtivo: StatusCliente;
  dataCobranca: string;
}
