import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Venda } from "../model/venda-entity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private http = inject(HttpClient);
  private apiUrl: string = 'https://690a47e51a446bb9cc221939.mockapi.io';

  public getAllVenda(): Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas`);
  }

  public getVendaById(id: number): Observable<Venda>{
    return this.http.get<Venda>(`${this.apiUrl}/vendas/${id}`)
  }

  public createVenda(venda: any): Observable<Venda>{
    return this.http.post<Venda>(`${this.apiUrl}/vendas`, venda);
  }

  public editVenda(id: number, venda: any): Observable<Venda>{
    return this.http.put<Venda>(`${this.apiUrl}/vendas/${id}`, venda);
  }

  public deleteVenda(id: number){
    return this.http.delete(`${this.apiUrl}/vendas/${id}`)
  }


}
