import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Transaction} from "../model/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}


  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(8).substring(2, 5);
  }

  getDadosEntrada(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  adicionarDespesa(despesa: Omit<Transaction, 'id'>): Observable<Transaction> {
    const novaDespesa: Transaction = {
      ...despesa,
      id: this.gerarId()
    };
    return this.http.post<Transaction>(this.apiUrl, novaDespesa);
  }

  deleteRegistro(transaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url);


  }

  //métodos novos
  // getMovimentacaoById(id: string): Observable<Transaction> {
  //   return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  // }
  
  atualizarMovimentacao(id: string, despesa: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, despesa);
  }
  

}