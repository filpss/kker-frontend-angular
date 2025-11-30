export interface Pagamento {
  id?: number;
  cliente: number;
  venda: number;
  valor: string;
  descricao: string;
  dataPagamento: Date;
}
