import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Transaction} from "../model/transaction";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getDadosEntrada(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  addTransaction(transaction:Transaction): Observable<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4()
    };
    return this.http.post<Transaction>(this.apiUrl, newTransaction);
  }

  deleteTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url);
  }

  atualizarMovimentacao(id: string, despesa: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, despesa);
  }
}
