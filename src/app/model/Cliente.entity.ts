import { StatusCliente } from "../shared/enums/StatusCliente";

export interface Cliente {
  id: number;
  nome: string;
  telefone: number;
  isAtivo: StatusCliente;
  dataCobranca: Date;
}
