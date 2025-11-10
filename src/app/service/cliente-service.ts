import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.entity';



@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private http = inject(HttpClient);
  private apiUrl: string = 'https://690a47e51a446bb9cc221939.mockapi.io';

  public getAllCustomer(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/customer`);
  }

  public getActive(){
    return this.http.get<Cliente>(`${this.apiUrl}/active`);
  }

  public createCustomer(cliente: any): Observable<any>{
    return this.http.post<Cliente>(`${this.apiUrl}/customer`, cliente);
  }

  public getCustomerById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/customer/${id}`);
  }

  public editCustomer(id: number, cliente: any): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}/customer/${id}`, cliente);
  }

  public deleteCustomer(id: number){
    return this.http.delete(`${this.apiUrl}/customer/${id}`);
  }


}
