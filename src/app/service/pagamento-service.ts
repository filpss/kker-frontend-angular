import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '../model/pagamento-entity';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private http = inject(HttpClient);
  private apiUrl: string = 'https://690a47e51a446bb9cc221939.mockapi.io';

  public getAllPagamento(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/pagamentos`);
  }

  public getPagamentoById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/pagamentos/${id}`);
  }

  public createPagamento(pagamento: any): Observable<Pagamento> {
    return this.http.post<Pagamento>(`${this.apiUrl}/pagamentos`, pagamento);
  }

  public editPagamento(id: number, pagamento: any): Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.apiUrl}/pagamentos/${id}`, pagamento);
  }

  public deletePagamento(id: number) {
    return this.http.delete(`${this.apiUrl}/pagamentos/${id}`);
  }
}
