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

  public getCustomer(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/customer`);
  }

  public getActive(){
    return this.http.get<Cliente>(`${this.apiUrl}/active`);
  }

  public createCustomer(cliente: any): Observable<any>{
    return this.http.post<Cliente>(`${this.apiUrl}/createCustomer`, cliente);
  }

  public getCustomerById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/customer/${id}`);
  }

  public editCustomer(id: number, cliente: any){
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  public deleteCustomer(){
    return this.http.delete(`${this.apiUrl}`);
  }
  

}
